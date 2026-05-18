import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const documents = [
  { title: "Aadhaar Card", status: "Uploaded", detail: "XXXX XXXX 4821" },
  { title: "Bank Passbook", status: "Uploaded", detail: "SBI ending 9012" },
  { title: "Profile Photo", status: "Uploaded", detail: "Worker ID photo" },
];

const skills = [
  "Sowing",
  "Transplantation",
  "Weeding",
  "Harvesting",
  "Sorting",
  "Loading",
];

const KycSetupScreen = ({ navigation }) => {
  const [profileType, setProfileType] = useState("Individual");
  const [affiliation, setAffiliation] = useState("Under FPO");

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#166534" />
      <LinearGradient colors={["#0F3D22", "#166534"]} style={styles.hero}>
        <View style={styles.logoRow}>
          <Image
            source={require("../../assets/Images/logo/iconpngplain.png")}
            style={styles.logoIcon}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.brand}>KisanSahakar</Text>
            <Text style={styles.brandSub}>KYC Setup</Text>
          </View>
        </View>

        <View style={styles.pendingBadge}>
          <Text style={styles.pendingText}>Verification pending</Text>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.greetingSection}>
          <Text style={styles.greeting}>Welcome, Aditya soni</Text>
          <Text style={styles.role}>Complete your KYC to start accepting farm work</Text>
        </View>

        <View style={styles.statusCard}>
          <View>
            <Text style={styles.statusLabel}>Verification status</Text>
            <Text style={styles.statusValue}>In Progress</Text>
          </View>
          <View style={styles.progressBadge}>
            <Text style={styles.progressText}>75%</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Profile type</Text>
        <View style={styles.segment}>
          {["Individual", "Group Leader"].map((item) => (
            <TouchableOpacity
              key={item}
              activeOpacity={0.85}
              style={[styles.segmentButton, profileType === item && styles.segmentButtonActive]}
              onPress={() => setProfileType(item)}
            >
              <Text style={[styles.segmentText, profileType === item && styles.segmentTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Affiliation</Text>
        <View style={styles.segment}>
          {["Individual", "Under FPO"].map((item) => (
            <TouchableOpacity
              key={item}
              activeOpacity={0.85}
              style={[styles.segmentButton, affiliation === item && styles.segmentButtonActive]}
              onPress={() => setAffiliation(item)}
            >
              <Text style={[styles.segmentText, affiliation === item && styles.segmentTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.fpoCard}>
          <Text style={styles.fpoLabel}>FPO ID</Text>
          <Text style={styles.fpoValue}>FPO-KS-2048</Text>
          <Text style={styles.fpoCopy}>Kisan Green Producer Company, Vijayapura cluster</Text>
        </View>

        <Text style={styles.sectionTitle}>KYC documents</Text>
        {documents.map((doc) => (
          <View key={doc.title} style={styles.docCard}>
            <View>
              <Text style={styles.docTitle}>{doc.title}</Text>
              <Text style={styles.docDetail}>{doc.detail}</Text>
            </View>
            <Text style={styles.docStatus}>{doc.status}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Skills selected</Text>
        <View style={styles.skillGrid}>
          {skills.map((skill) => (
            <View key={skill} style={styles.skillPill}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0.88}
          style={styles.button}
          onPress={() => navigation.replace("Home")}
        >
          <Text style={styles.buttonText}>Continue to Dashboard</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FBF6",
  },
  hero: {
    paddingTop: 58,
    paddingHorizontal: 22,
    paddingBottom: 24,
    borderBottomRightRadius: 28,
    borderBottomLeftRadius: 28,
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 32,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  logoIcon: {
    width: 54,
    height: 54,
  },
  brand: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
  },
  brandSub: {
    color: "#CDEBD2",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 2,
  },
  pendingBadge: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginBottom: 0,
  },
  pendingText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
  },
  greetingSection: {
    marginBottom: 16,
  },
  greeting: {
    color: "#102A18",
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 4,
  },
  role: {
    color: "#607769",
    fontSize: 14,
    fontWeight: "600",
  },
  statusCard: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 20,
    backgroundColor: "#E7F8EC",
    borderWidth: 1,
    borderColor: "#D1EDD9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusLabel: {
    color: "#166534",
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  statusValue: {
    color: "#102A18",
    fontSize: 16,
    fontWeight: "900",
    marginTop: 4,
  },
  progressBadge: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "#16A34A",
  },
  progressText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },
  title: {
    color: "#102A18",
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "900",
    marginTop: 26,
  },
  subtitle: {
    color: "#607769",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
  },
  sectionTitle: {
    color: "#163B22",
    fontSize: 16,
    fontWeight: "900",
    marginTop: 26,
    marginBottom: 12,
  },
  segment: {
    flexDirection: "row",
    padding: 5,
    borderRadius: 18,
    backgroundColor: "#EAF7EE",
  },
  segmentButton: {
    flex: 1,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
  },
  segmentButtonActive: {
    backgroundColor: "#16A34A",
  },
  segmentText: {
    color: "#446451",
    fontSize: 14,
    fontWeight: "900",
  },
  segmentTextActive: {
    color: "#FFFFFF",
  },
  fpoCard: {
    marginTop: 16,
    padding: 16,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDEFE2",
  },
  fpoLabel: {
    color: "#68836F",
    fontSize: 12,
    fontWeight: "900",
  },
  fpoValue: {
    color: "#102A18",
    fontSize: 20,
    fontWeight: "900",
    marginTop: 4,
  },
  fpoCopy: {
    color: "#607769",
    fontSize: 13,
    marginTop: 4,
  },
  docCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E1F0E6",
    marginBottom: 10,
  },
  docTitle: {
    color: "#14351F",
    fontSize: 15,
    fontWeight: "900",
  },
  docDetail: {
    color: "#6A8170",
    fontSize: 13,
    marginTop: 4,
  },
  docStatus: {
    color: "#15803D",
    fontSize: 12,
    fontWeight: "900",
  },
  skillGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  skillPill: {
    paddingVertical: 9,
    paddingHorizontal: 13,
    borderRadius: 999,
    backgroundColor: "#E9FBEF",
    borderWidth: 1,
    borderColor: "#CBEBD3",
  },
  skillText: {
    color: "#166534",
    fontSize: 13,
    fontWeight: "900",
  },
  button: {
    minHeight: 58,
    borderRadius: 18,
    backgroundColor: "#16A34A",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
  },
});

export default KycSetupScreen;
