import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "../../localization/i18n";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 
const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const DEFAULT_ANALYSIS = {
  itemName: "Farm item",
  qualityStatus: "Needs review",
  confidence: "Medium",
  visibleProblems: [],
  likelyCauses: [],
  actionNow: [],
  sortingAdvice: "",
  shortSummary: "",
  rawText: "",
};

function cleanJsonText(text = "") {
  return text.replace(/```json|```/g, "").trim();
}

function extractGeminiText(data) {
  const outputParts = Array.isArray(data?.output)
    ? data.output.flatMap((item) => item?.content || item?.parts || [])
    : [];
  const candidateParts = Array.isArray(data?.candidates)
    ? data.candidates.flatMap((candidate) => candidate?.content?.parts || [])
    : [];

  return [
    data?.output_text,
    data?.outputText,
    data?.response?.output_text,
    ...outputParts.map((part) => part?.text),
    ...candidateParts.map((part) => part?.text),
  ]
    .filter(Boolean)
    .join("\n")
    .trim();
}

function parseAnalysisOutput(outputText, rawResponse) {
  const cleanedText = cleanJsonText(outputText);

  if (!cleanedText) {
    return safeAnalysisPayload({
      qualityStatus: "Needs review",
      confidence: "Low",
      shortSummary: "Gemini did not return readable text. Please try again with a clearer farm photo.",
      rawText: JSON.stringify(rawResponse, null, 2),
    });
  }

  try {
    return safeAnalysisPayload({
      ...JSON.parse(cleanedText),
      rawText: cleanedText,
    });
  } catch {
    const jsonStart = cleanedText.indexOf("{");
    const jsonEnd = cleanedText.lastIndexOf("}");

    if (jsonStart >= 0 && jsonEnd > jsonStart) {
      try {
        return safeAnalysisPayload({
          ...JSON.parse(cleanedText.slice(jsonStart, jsonEnd + 1)),
          rawText: cleanedText,
        });
      } catch {
        // Fall through and show the plain Gemini text.
      }
    }

    return safeAnalysisPayload({
      itemName: "Gemini report",
      qualityStatus: "Analysis report",
      confidence: "Text",
      shortSummary: cleanedText,
      rawText: cleanedText,
    });
  }
}

function safeAnalysisPayload(payload) {
  return {
    ...DEFAULT_ANALYSIS,
    ...payload,
    visibleProblems: Array.isArray(payload?.visibleProblems) ? payload.visibleProblems : [],
    likelyCauses: Array.isArray(payload?.likelyCauses) ? payload.likelyCauses : [],
    actionNow: Array.isArray(payload?.actionNow) ? payload.actionNow : [],
  };
}

function buildPrompt(language) {
  return `
You are an agriculture image quality assistant for Indian farmers and farm workers.
Analyze the uploaded image for farming-related items such as tomato, paddy, crop leaf, fruit, vegetable, seed, soil, or harvest material.

Create a short, easy farming image analysis report.

Rules:
- Use very easy words.
- If it looks like tomato, mention ripeness, bruises, cracks, fungal spots, pest damage, color, and market quality.
- If quality cannot be judged from the photo, say exactly what better photo is needed.
- Keep the report short and practical.
- Use this format:
  Crop/item:
  Quality:
  Visible problem:
  What it means:
  What to do now:
  Sorting advice:
  Simple summary:
- Reply language code: ${language}.
`;
}

async function analyzeWithGemini(asset, language) {
  const response = await fetch(`${GEMINI_ENDPOINT}?key=${encodeURIComponent(GEMINI_API_KEY)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [
            { text: buildPrompt(language) },
            {
              inlineData: {
                mimeType: asset.mimeType || "image/jpeg",
                data: asset.base64,
              },
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.25,
        maxOutputTokens: 900,
      },
    }),
  });

  const responseText = await response.text();
  let data = {};

  try {
    data = responseText ? JSON.parse(responseText) : {};
  } catch {
    data = { rawResponse: responseText };
  }

  if (!response.ok) {
    const message = data?.error?.message || responseText || "Image analysis failed";
    return safeAnalysisPayload({
      itemName: "Farm image",
      qualityStatus: "API error",
      confidence: "Low",
      shortSummary: message,
      rawText: responseText || JSON.stringify(data, null, 2),
    });
  }

  const outputText = extractGeminiText(data);
  return parseAnalysisOutput(outputText || data.rawResponse, data);
}

export default function ImageAnalysisScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { tx, language } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const statusTone = useMemo(() => {
    const status = analysis?.qualityStatus?.toLowerCase() || "";
    if (status.includes("good")) {
      return { color: "#15803D", bg: "#E9FBEF", icon: "checkmark-circle" };
    }
    if (status.includes("poor")) {
      return { color: "#B91C1C", bg: "#FEF2F2", icon: "warning" };
    }
    return { color: "#B7791F", bg: "#FFF7E6", icon: "alert-circle" };
  }, [analysis]);

  const showStructuredDetails = analysis && !["analysis report", "api error"].includes(
    analysis.qualityStatus?.toLowerCase()
  );

  async function pickImage(source) {
    try {
      const permission =
        source === "camera"
          ? await ImagePicker.requestCameraPermissionsAsync()
          : await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(tx("Permission needed"), tx("Please allow camera or gallery permission to analyse the image."));
        return;
      }

      const pickerOptions = {
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.72,
        base64: true,
      };

      const result =
        source === "camera"
          ? await ImagePicker.launchCameraAsync(pickerOptions)
          : await ImagePicker.launchImageLibraryAsync(pickerOptions);

      if (result.canceled || !result.assets?.[0]?.base64) {
        return;
      }

      const asset = result.assets[0];
      setSelectedImage(asset);
      setAnalysis(null);
      setLoading(true);
      const nextAnalysis = await analyzeWithGemini(asset, language);
      setAnalysis(nextAnalysis);
    } catch (error) {
      Alert.alert(tx("Analysis failed"), error.message || tx("Please try again with a clearer photo."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#082F1B" />
      <LinearGradient
        colors={["#082F1B", "#116834", "#2F8C44"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + 12 }]}
      >
        <View style={styles.headerTop}>
          <Pressable accessibilityRole="button" style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </Pressable>
          <Text style={styles.headerTitle}>{tx("Crop Image Analysis")}</Text>
          <View style={styles.backButtonPlaceholder} />
        </View>

        <View style={styles.heroRow}>
          <View style={styles.heroIcon}>
            <MaterialCommunityIcons name="image-search" size={28} color="#FBBF24" />
          </View>
          <View style={styles.heroCopy}>
            <Text style={styles.heroTitle}>{tx("Check crop quality")}</Text>
            <Text style={styles.heroSubtitle}>{tx("Take or upload a farm photo to get simple quality guidance.")}</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 26 }]}
      >
        <View style={styles.actionRow}>
          <Pressable style={styles.actionButton} onPress={() => pickImage("camera")} disabled={loading}>
            <Ionicons name="camera" size={22} color="#15803D" />
            <Text style={styles.actionText}>{tx("Camera")}</Text>
          </Pressable>
          <Pressable style={styles.actionButton} onPress={() => pickImage("gallery")} disabled={loading}>
            <Ionicons name="images" size={22} color="#15803D" />
            <Text style={styles.actionText}>{tx("Gallery")}</Text>
          </Pressable>
        </View>

        <View style={styles.previewCard}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage.uri }} style={styles.previewImage} resizeMode="cover" />
          ) : (
            <View style={styles.emptyPreview}>
              <MaterialCommunityIcons name="sprout" size={38} color="#15803D" />
              <Text style={styles.emptyTitle}>{tx("No image selected")}</Text>
              <Text style={styles.emptySubtitle}>{tx("Choose a clear photo of crop, fruit, leaf, or harvest material.")}</Text>
            </View>
          )}
        </View>

        {loading && (
          <View style={styles.loadingCard}>
            <ActivityIndicator color="#15803D" />
            <Text style={styles.loadingText}>{tx("Analysing farm image...")}</Text>
          </View>
        )}

        {analysis && !loading && (
          <View style={styles.resultWrap}>
            <View style={[styles.statusCard, { backgroundColor: statusTone.bg }]}>
              <View style={styles.statusLeft}>
                <Ionicons name={statusTone.icon} size={24} color={statusTone.color} />
                <View>
                  <Text style={styles.statusLabel}>{tx("Quality result")}</Text>
                  <Text style={[styles.statusValue, { color: statusTone.color }]}>{analysis.qualityStatus}</Text>
                </View>
              </View>
              <View style={styles.confidencePill}>
                <Text style={styles.confidenceText}>{tx("Confidence")}: {analysis.confidence}</Text>
              </View>
            </View>

            {showStructuredDetails && (
              <>
                <ResultSection title={tx("Detected item")} icon="leaf" lines={[analysis.itemName]} />
                <ResultSection title={tx("Visible problems")} icon="eye" lines={analysis.visibleProblems} empty={tx("No major visible problem found")} />
                <ResultSection title={tx("Possible reasons")} icon="help-circle" lines={analysis.likelyCauses} empty={tx("No clear reason visible")} />
                <ResultSection title={tx("What to do now")} icon="construct" lines={analysis.actionNow} empty={tx("No immediate action needed")} />
                <ResultSection title={tx("Sorting advice")} icon="basket" lines={[analysis.sortingAdvice]} />
              </>
            )}
            <View style={styles.summaryBox}>
              <Text style={styles.summaryTitle}>
                {showStructuredDetails ? tx("Easy summary") : tx("Analysis report")}
              </Text>
              <Text style={styles.summaryText}>{analysis.shortSummary}</Text>
            </View>
            {!!analysis.rawText && analysis.rawText !== analysis.shortSummary && (
              <ResultSection title={tx("Gemini text output")} icon="document-text" lines={[analysis.rawText]} />
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function ResultSection({ title, icon, lines, empty }) {
  const visibleLines = lines?.filter(Boolean) || [];

  return (
    <View style={styles.resultCard}>
      <View style={styles.resultHeader}>
        <Ionicons name={icon} size={18} color="#15803D" />
        <Text style={styles.resultTitle}>{title}</Text>
      </View>
      {(visibleLines.length ? visibleLines : [empty]).filter(Boolean).map((line, index) => (
        <View key={`${line}-${index}`} style={styles.resultLine}>
          <View style={styles.resultDot} />
          <Text style={styles.resultText}>{line}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F4FAF2",
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 26,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonPlaceholder: {
    width: 42,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
  },
  heroRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    marginTop: 18,
  },
  heroIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.13)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroCopy: {
    flex: 1,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
  },
  heroSubtitle: {
    color: "#D7F5DE",
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "800",
    marginTop: 5,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    minHeight: 58,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCEBDD",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  actionText: {
    color: "#12351F",
    fontSize: 14,
    fontWeight: "900",
  },
  previewCard: {
    minHeight: 230,
    marginTop: 16,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCEBDD",
  },
  previewImage: {
    width: "100%",
    height: 260,
  },
  emptyPreview: {
    minHeight: 230,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  emptyTitle: {
    color: "#12351F",
    fontSize: 18,
    fontWeight: "900",
    marginTop: 10,
  },
  emptySubtitle: {
    color: "#647A69",
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 6,
  },
  loadingCard: {
    marginTop: 16,
    minHeight: 58,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCEBDD",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  loadingText: {
    color: "#356246",
    fontSize: 13,
    fontWeight: "900",
  },
  resultWrap: {
    marginTop: 16,
    gap: 12,
  },
  statusCard: {
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: "#DCEBDD",
    gap: 12,
  },
  statusLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  statusLabel: {
    color: "#647A69",
    fontSize: 12,
    fontWeight: "800",
  },
  statusValue: {
    fontSize: 22,
    fontWeight: "900",
    marginTop: 2,
  },
  confidencePill: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.76)",
  },
  confidenceText: {
    color: "#356246",
    fontSize: 12,
    fontWeight: "900",
  },
  resultCard: {
    borderRadius: 20,
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCEBDD",
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 10,
  },
  resultTitle: {
    color: "#12351F",
    fontSize: 15,
    fontWeight: "900",
  },
  resultLine: {
    flexDirection: "row",
    gap: 9,
    marginTop: 7,
  },
  resultDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#16A34A",
    marginTop: 7,
  },
  resultText: {
    flex: 1,
    color: "#4D6656",
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "700",
  },
  summaryBox: {
    borderRadius: 20,
    padding: 16,
    backgroundColor: "#12351F",
  },
  summaryTitle: {
    color: "#BBF7D0",
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  summaryText: {
    color: "#FFFFFF",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "800",
    marginTop: 8,
  },
});
