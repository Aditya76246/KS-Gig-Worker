import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  StyleSheet,
  Alert,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "../../localization/i18n";

const fallbackJob = {
  id: "JOB-1842",
  crop: "Paddy",
  type: "Harvest cutting",
  farmer: "Ramesh Patil",
  village: "Hulikeri",
  pay: "Rs 850/day",
  distance: "2.4 km",
  time: "Today, 7:30 AM",
  workers: "6 workers needed",
  rating: "4.8",
  image: require("../../../assets/images/Banner/Slider-2.png"),
  lat: 17.3841,
  lng: 78.4564,
  phone: "+919876543210",
};

const parseKilometers = (distance) => {
  if (typeof distance === 'number') {
    return distance;
  }
  const match = String(distance).match(/([\d.]+)\s*km/);
  return match ? parseFloat(match[1]) : 0;
};

const GEMINI_API_KEY = process.env.GEMINI_API_KEY_FILE;
const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const formatCost = (value) => `₹${Math.round(value).toLocaleString('en-IN')}`;
const formatMinutes = (minutes) => `${minutes} min`;

const cleanGeminiText = (text = "") => text.replace(/```json|```/g, "").trim();

const extractGeminiText = (data) => {
  if (!data) return "";
  if (data.output_text) return data.output_text;
  if (data.response?.output_text) return data.response.output_text;

  const outputParts = Array.isArray(data.output)
    ? data.output.flatMap((item) => item?.content || item?.parts || [])
    : [];

  const candidateParts = Array.isArray(data.candidates)
    ? data.candidates.flatMap((candidate) => candidate?.content?.parts || [])
    : [];

  return [
    ...outputParts.map((part) => part?.text),
    ...candidateParts.map((part) => part?.text),
  ]
    .filter(Boolean)
    .join("\n")
    .trim();
};

const splitRouteSteps = (text) => {
  const cleaned = text.replace(/\r/g, "").trim();
  const lines = cleaned
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^[-•\s]*\d*\.?\s*/, ""));

  if (lines.length > 1) {
    return lines;
  }

  const sentenceParts = cleaned
    .split(/\.\s+/)
    .map((part) => part.trim())
    .filter((part) => part.length > 0);

  if (sentenceParts.length > 1) {
    return sentenceParts.map((sentence) => {
      const normalized = sentence.replace(/^[0-9]+\.|^-\s*/, "").trim();
      return normalized.endsWith(".") ? normalized : `${normalized}.`;
    });
  }

  return [cleaned];
};

const parseRouteStepsFromText = (text) => {
  const cleaned = String(text || "").replace(/\r/g, "").trim();
  const lines = cleaned
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^[-•\s]*\d+\.?\s*/, ""))
    .map((line) => line.replace(/^(step\s*\d+[:.-]?\s*)/i, ""))
    .map((line) => line.replace(/^['"]|['"]$/g, "").trim())
    .filter(Boolean);

  if (lines.length > 1) {
    return lines;
  }

  return splitRouteSteps(cleaned);
};

const normalizeRouteSteps = (value) => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === "string" ? item.trim() : ""))
      .filter(Boolean);
  }

  return parseRouteStepsFromText(String(value));
};

const parseRouteResponse = (outputText) => {
  const cleaned = cleanGeminiText(outputText || "");
  if (!cleaned) {
    return { distance: "", duration: "", routeDescription: "", routeSteps: [] };
  }

  const parseJson = (text) => {
    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  };

  let parsedJson = parseJson(cleaned);
  if (!parsedJson) {
    const jsonStart = cleaned.indexOf("{");
    const jsonEnd = cleaned.lastIndexOf("}");
    if (jsonStart >= 0 && jsonEnd > jsonStart) {
      parsedJson = parseJson(cleaned.slice(jsonStart, jsonEnd + 1));
    }
  }

  if (parsedJson) {
    return {
      distance: parsedJson.distance || parsedJson.routeDistance || "",
      duration: parsedJson.duration || parsedJson.travelTime || "",
      routeDescription: parsedJson.routeDescription || parsedJson.summary || "",
      routeSteps: normalizeRouteSteps(
        parsedJson.routeSteps || parsedJson.steps || parsedJson.directions || parsedJson.route || parsedJson.route_description,
      ),
    };
  }

  const distanceMatch = cleaned.match(/([\d.]+\s?km)/i);
  const durationMatch = cleaned.match(/(\d+\s?(?:min|mins|minutes|hour|hours))/i);
  const routeSteps = parseRouteStepsFromText(cleaned);
  const firstLine = cleaned.split(/\n+/)[0] || cleaned;

  return {
    distance: distanceMatch?.[1] || "",
    duration: durationMatch?.[1] || "",
    routeDescription: firstLine,
    routeSteps,
  };
};

const buildRoutePrompt = (originLat, originLng, destLat, destLng) => `You are a route estimation assistant. Provide route distance, travel time, and a human-friendly tracking flow between the following points in India.

Origin latitude: ${originLat}
Origin longitude: ${originLng}
Destination latitude: ${destLat}
Destination longitude: ${destLng}

Answer only in JSON with the keys: distance, duration, routeDescription, routeSteps.
- distance: brief route distance like '4.3 km'
- duration: brief travel time like '12 min'
- routeDescription: one short summary sentence
- routeSteps: array of step strings describing the route in clear driving flow.

Example output:
{
  "distance": "4.3 km",
  "duration": "12 min",
  "routeDescription": "Take the shortest route to the farm with one right turn.",
  "routeSteps": [
    "Start at your current location and head southeast.",
    "Continue straight for 2 km.",
    "Turn right at the market and follow the road for 1 km.",
    "Arrive at the farm entrance on your left."
  ]
}
`;

const steps = [
  { title: "Accept job", detail: "Worker confirms availability" },
  { title: "Navigate to farm", detail: "Open farm location and route" },
  { title: "GPS punch-in", detail: "Start time saved offline if needed" },
  { title: "Proof and punch-out", detail: "Photo proof and payment request" },
];

const JobDetailsScreen = ({ navigation, route }) => {
  const job = route.params?.job || fallbackJob;
  const [accepted, setAccepted] = useState(false);
  const [punchedIn, setPunchedIn] = useState(false);
  const { tx } = useTranslation();

  const distanceKm = parseKilometers(job.distance);
  const estimatedTravelMinutes = Math.max(5, Math.round(distanceKm * 2.2));
  const travelCost = distanceKm * 30;
  const liveStatus = accepted ? tx('Live tracking active') : tx('Ready to track');

  const destinationLat = Number(job.lat) || 17.3841;
  const destinationLng = Number(job.lng) || 78.4564;
  const originLat = Number(job.originLat) || 17.3850;
  const originLng = Number(job.originLng) || 78.4867;
  const farmerPhone = String(job.phone || '+919876543210');

  const [routeInfo, setRouteInfo] = useState({
    distance: job.distance || '',
    duration: formatMinutes(estimatedTravelMinutes),
    routeDescription: job.routeDescription || '',
    routeSteps: [],
  });
  const [routeLoading, setRouteLoading] = useState(false);
  const [routeError, setRouteError] = useState('');
  const [isTrackingActive, setIsTrackingActive] = useState(false);

  const fetchRouteDetails = useCallback(async () => {
    if (!destinationLat || !destinationLng) {
      return;
    }

    setRouteLoading(true);
    setRouteError('');

    try {
      const response = await fetch(`${GEMINI_ENDPOINT}?key=${encodeURIComponent(GEMINI_API_KEY)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: buildRoutePrompt(originLat, originLng, destinationLat, destinationLng) }],
            },
          ],
          generationConfig: {
            temperature: 0.12,
            maxOutputTokens: 300,
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

      const outputText = extractGeminiText(data) || responseText;
      const parsed = parseRouteResponse(outputText);

      setRouteInfo((prev) => ({
        distance: parsed.distance || prev.distance,
        duration: parsed.duration || prev.duration,
        routeDescription: parsed.routeDescription || prev.routeDescription,
        routeSteps: parsed.routeSteps?.length ? parsed.routeSteps : prev.routeSteps,
      }));

      if (!response.ok) {
        throw new Error(data?.error?.message || responseText || 'Route lookup failed');
      }
    } catch (error) {
      setRouteError(error?.message || tx('Unable to load route info'));
    } finally {
      setRouteLoading(false);
    }
  }, [destinationLat, destinationLng, originLat, originLng, tx]);

  useEffect(() => {
    fetchRouteDetails();
  }, [fetchRouteDetails]);

  const openRoute = () => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destinationLat},${destinationLng}&travelmode=driving`;
    Linking.openURL(url).catch(() => Alert.alert(tx('Error'), tx('Unable to open maps')));
  };

  const callFarmer = () => {
    const url = `tel:${farmerPhone}`;
    Linking.openURL(url).catch(() => Alert.alert(tx('Error'), tx('Unable to make a call')));
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#0F3D22" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.imageWrap}>
          <Image source={job.image} style={styles.image} resizeMode="cover" />
          <LinearGradient
            colors={["rgba(0,0,0,0.05)", "rgba(0,0,0,0.76)"]}
            style={styles.imageOverlay}
          >
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backText}>{tx("Back")}</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.crop}>{tx(job.crop)}</Text>
              <Text style={styles.title}>{tx(job.type)}</Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.payCard}>
          <View>
            <Text style={styles.payLabel}>{tx("Worker pay")}</Text>
            <Text style={styles.payValue}>{job.pay}</Text>
          </View>
          <View style={styles.distanceBadge}>
            <Text style={styles.distanceText}>{job.distance}</Text>
          </View>
        </View>

        <View style={styles.cartCard}>
          <Text style={styles.cartTitle}>{tx("Job summary")}</Text>
          <View style={styles.cartRow}>
            <Text style={styles.cartLabel}>{tx("Distance to client")}</Text>
            <Text style={styles.cartValue}>{job.distance}</Text>
          </View>
          <View style={styles.cartRow}>
            <Text style={styles.cartLabel}>{tx("Estimated travel time")}</Text>
            <Text style={styles.cartValue}>{routeInfo.duration}</Text>
          </View>
          <View style={styles.cartRow}>
            <Text style={styles.cartLabel}>{tx("Travel cost")}</Text>
            <Text style={styles.cartValue}>{formatCost(travelCost)}</Text>
          </View>
          <View style={styles.cartRow}>
            <Text style={styles.cartLabel}>{tx("Work start")}</Text>
            <Text style={styles.cartValue}>{tx(job.time)}</Text>
          </View>
          <View style={styles.cartRow}>
            <Text style={styles.cartLabel}>{tx("Route distance")}</Text>
            <Text style={styles.cartValue}>{routeInfo.distance || job.distance}</Text>
          </View>
          {job.lat != null && job.lng != null && (
            <View style={styles.cartRow}>
              <Text style={styles.cartLabel}>{tx("Client coordinates")}</Text>
              <Text style={styles.cartValue}>{`${destinationLat.toFixed(4)}, ${destinationLng.toFixed(4)}`}</Text>
            </View>
          )}
          {routeError ? (
            <Text style={styles.routeError}>{routeError}</Text>
          ) : routeLoading ? (
            <Text style={styles.routeLoading}>{tx('Fetching route details...')}</Text>
          ) : routeInfo.routeDescription ? (
            <View style={styles.routeSummaryBox}>
              <Text style={styles.routeSummaryLabel}>{tx('Tracking flow')}</Text>
              {routeInfo.routeSteps?.length > 0 ? (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.routeStepsHorizontal}
                >
                  {routeInfo.routeSteps.map((step, index) => (
                    <View key={`${step}-${index}`} style={styles.routeStepChip}>
                      <Text style={styles.routeStepChipIndex}>{index + 1}</Text>
                      <Text style={styles.routeStepChipText} numberOfLines={2}>{step}</Text>
                    </View>
                  ))}
                </ScrollView>
              ) : (
                <Text style={styles.routeSummaryText}>{routeInfo.routeDescription}</Text>
              )}
            </View>
          ) : null}
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{liveStatus}</Text>
          </View>
          <View style={styles.optionRow}>
            <TouchableOpacity activeOpacity={0.9} style={styles.optionButton} onPress={openRoute}>
              <Text style={styles.optionText}>{tx("Open route")}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} style={styles.optionButton} onPress={callFarmer}>
              <Text style={styles.optionText}>{tx("Call farmer")}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoGrid}>
          <Info label={tx("Farmer")} value={job.farmer} />
          <Info label={tx("Village")} value={tx(job.village)} />
          <Info label={tx("Start")} value={tx(job.time)} />
          <Info label={tx("Team")} value={tx(job.workers)} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{tx("Job lifecycle")}</Text>
          {steps.map((step, index) => (
            <View key={step.title} style={styles.stepRow}>
              <View style={styles.stepDot}>
                <Text style={styles.stepDotText}>{index + 1}</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>{tx(step.title)}</Text>
                <Text style={styles.stepDetail}>{tx(step.detail)}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{tx("Pricing and settlement")}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>{tx("Base wage")}</Text>
            <Text style={styles.priceValue}>{job.pay}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>{tx("Platform/FPO commission")}</Text>
            <Text style={styles.priceValue}>{tx("5 percent")}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>{tx("Payment mode")}</Text>
            <Text style={styles.priceValue}>{tx("Cash or online")}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{tx("Completion proof")}</Text>
          <Text style={styles.cardCopy}>
            {tx("Upload one farm photo after work completion. This static demo shows the flow only.")}
          </Text>
          <TouchableOpacity activeOpacity={0.85} style={styles.outlineButton}>
            <Text style={styles.outlineButtonText}>{tx("Add Proof Photo")}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            activeOpacity={0.86}
            style={[styles.primaryButton, accepted && styles.primaryButtonMuted]}
            onPress={() => setAccepted(true)}
          >
            <Text style={styles.primaryButtonText}>{accepted ? tx("Job Accepted") : tx("Accept Job")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.86}
            style={styles.secondaryButton}
            onPress={() => setPunchedIn((value) => !value)}
          >
            <Text style={styles.secondaryButtonText}>{punchedIn ? tx("Punch Out") : tx("GPS Punch In")}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const Info = ({ label, value }) => (
  <View style={styles.infoCard}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5FBF6",
  },
  content: {
    paddingBottom: 30,
  },
  imageWrap: {
    height: 292,
    backgroundColor: "#12331E",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
    paddingHorizontal: 22,
    paddingTop: 56,
    paddingBottom: 22,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  backText: {
    color: "#14351F",
    fontWeight: "900",
  },
  crop: {
    color: "#BBF7D0",
    fontSize: 14,
    fontWeight: "900",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 31,
    lineHeight: 37,
    fontWeight: "900",
    marginTop: 4,
  },
  payCard: {
    marginHorizontal: 22,
    marginTop: -28,
    padding: 18,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E1F0E6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  payLabel: {
    color: "#6A8170",
    fontSize: 12,
    fontWeight: "900",
  },
  payValue: {
    color: "#15803D",
    fontSize: 26,
    fontWeight: "900",
    marginTop: 3,
  },
  distanceBadge: {
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "#E9FBEF",
  },
  distanceText: {
    color: "#166534",
    fontSize: 13,
    fontWeight: "900",
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginHorizontal: 22,
    marginTop: 16,
  },
  infoCard: {
    width: "48.5%",
    padding: 14,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E1F0E6",
  },
  infoLabel: {
    color: "#6A8170",
    fontSize: 12,
    fontWeight: "900",
  },
  infoValue: {
    color: "#14351F",
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "900",
    marginTop: 5,
  },
  cartCard: {
    marginHorizontal: 22,
    marginTop: 16,
    padding: 18,
    borderRadius: 22,
    backgroundColor: "#F5FFF2",
    borderWidth: 1,
    borderColor: "#D1E9D8",
  },
  cartTitle: {
    color: "#0F5F2F",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 14,
  },
  cartRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cartLabel: {
    color: "#4B6D56",
    fontSize: 13,
    flex: 1,
  },
  cartValue: {
    color: "#14351F",
    fontSize: 14,
    fontWeight: "900",
    marginLeft: 12,
  },
  cartBadge: {
    marginTop: 4,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: "#DCFCE7",
  },
  cartBadgeText: {
    color: "#166534",
    fontSize: 12,
    fontWeight: "900",
  },
  optionRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 18,
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#A7F3D0",
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    color: "#166534",
    fontSize: 13,
    fontWeight: "900",
  },
  card: {
    marginHorizontal: 22,
    marginTop: 16,
    padding: 18,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E1F0E6",
  },
  cardTitle: {
    color: "#14351F",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 12,
  },
  cardCopy: {
    color: "#607769",
    fontSize: 14,
    lineHeight: 21,
  },
  stepRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
  },
  stepDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#E9FBEF",
    alignItems: "center",
    justifyContent: "center",
  },
  stepDotText: {
    color: "#166534",
    fontSize: 13,
    fontWeight: "900",
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    color: "#14351F",
    fontSize: 15,
    fontWeight: "900",
  },
  stepDetail: {
    color: "#6A8170",
    fontSize: 13,
    marginTop: 3,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EDF5EF",
  },
  priceLabel: {
    color: "#607769",
    fontSize: 14,
  },
  priceValue: {
    color: "#14351F",
    fontSize: 14,
    fontWeight: "900",
  },
  outlineButton: {
    minHeight: 48,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#16A34A",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },
  outlineButtonText: {
    color: "#15803D",
    fontSize: 14,
    fontWeight: "900",
  },
  routeLoading: {
    color: "#4B6D56",
    fontSize: 13,
    marginTop: 8,
  },
  routeError: {
    color: "#B91C1C",
    fontSize: 13,
    marginTop: 8,
  },
  routeSummaryBox: {
    marginTop: 10,
    padding: 12,
    borderRadius: 16,
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },
  routeSummaryLabel: {
    color: "#166534",
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 10,
  },
  routeSummaryText: {
    color: "#14532D",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  routeSummaryHint: {
    color: "#166534",
    fontSize: 12,
    marginBottom: 12,
  },
  routeStepsHorizontal: {
    flexDirection: "row",
  },
  routeStepChip: {
    minWidth: 140,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginRight: 10,
    borderRadius: 18,
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },
  routeStepChipIndex: {
    color: "#166534",
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 6,
  },
  routeStepChipText: {
    color: "#14532D",
    fontSize: 13,
    lineHeight: 18,
  },
  routeStepsHeader: {
    color: "#0F5132",
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 6,
  },
  routeStepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 10,
  },
  routeStepBullet: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#D1E9D8",
    alignItems: "center",
    justifyContent: "center",
  },
  routeStepBulletText: {
    color: "#166534",
    fontSize: 12,
    fontWeight: "900",
  },
  routeStepText: {
    color: "#14532D",
    fontSize: 13,
    lineHeight: 20,
    flex: 1,
  },
  routeSummaryActive: {
    borderColor: "#10B981",
    backgroundColor: "#ECFDF5",
  },
  actions: {
    marginHorizontal: 22,
    marginTop: 18,
    flexDirection: "row",
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    minHeight: 56,
    borderRadius: 18,
    backgroundColor: "#16A34A",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonMuted: {
    backgroundColor: "#15803D",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },
  secondaryButton: {
    flex: 1,
    minHeight: 56,
    borderRadius: 18,
    backgroundColor: "#E9FBEF",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: "#166534",
    fontSize: 15,
    fontWeight: "900",
  },
});

export default JobDetailsScreen;


