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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "../localization/i18n";

const documents = [
  { id: 1, title: "Aadhaar Card", status: "Verified", detail: "XXXX XXXX 4821", icon: "id-card-outline" },
  { id: 2, title: "Bank Passbook", status: "Verified", detail: "SBI ending 9012", icon: "business-outline" },
  { id: 3, title: "Profile Photo", status: "Verified", detail: "Worker ID photo", icon: "camera-outline" },
];

const skills = ["Sowing", "Transplantation", "Weeding", "Harvesting", "Sorting", "Loading"];

const KycSetupScreen = ({ navigation }) => {
  const { tx } = useTranslation();
  const insets = useSafeAreaInsets();
  const [profileType, setProfileType] = useState("Individual");
  const [affiliation, setAffiliation] = useState("Under FPO");

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#082F1B" />

      {/* --- SLIM HEADER --- */}
      <LinearGradient
        colors={["#082F1B", "#116834"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.slimHero, { paddingTop: insets.top + 12 }]}
      >
        <View style={styles.headerTopRow}>
          <View style={styles.brandGroup}>
            <Image
              source={require("../../assets/images/logo/iconpngplain.png")}
              style={styles.logoSmall}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.brandTitle}>Kisan Sahakar</Text>
              <Text style={styles.brandSubTitle}>{tx("KYC Setup")}</Text>
            </View>
          </View>

          {/* Verification Badge moved to top right */}
          <View style={styles.statusBadge}>
            <View style={styles.pulseDot} />
            <Text style={styles.statusBadgeText}>{tx("In Progress")}</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 30 }]}
      >
        {/* --- USER WELCOME & PROGRESS SECTION (NOW OUTSIDE HEADER) --- */}
        <View style={styles.userSection}>
          <View style={styles.welcomeInfo}>
            <Text style={styles.welcomeText}>{tx("Welcome, Aditya Soni")}</Text>
            <Text style={styles.welcomeSub}>{tx("75% of your profile is complete")}</Text>
          </View>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: '75%' }]} />
            </View>
            <Text style={styles.progressPercent}>75%</Text>
          </View>
        </View>

        {/* --- SELECTION SECTION --- */}
        <Text style={styles.sectionTitle}>{tx("Work Profile Type")}</Text>
        <View style={styles.segmentContainer}>
          {["Individual", "Group Leader"].map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.segmentBtn, profileType === item && styles.segmentBtnActive]}
              onPress={() => setProfileType(item)}
            >
              <MaterialCommunityIcons 
                name={item === "Individual" ? "account" : "account-group"} 
                size={18} 
                color={profileType === item ? "#FFF" : "#446451"} 
              />
              <Text style={[styles.segmentText, profileType === item && styles.segmentTextActive]}>
                {tx(item)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>{tx("FPO Affiliation")}</Text>
        <View style={styles.fpoCard}>
          <View style={styles.fpoMain}>
            <Ionicons name="business" size={24} color="#16A34A" />
            <View style={styles.fpoTextContent}>
              <Text style={styles.fpoId}>ID: FPO-KS-2048</Text>
              <Text style={styles.fpoName}>Kisan Green Producer Company</Text>
            </View>
          </View>
        </View>

        {/* --- DOCUMENTS SECTION --- */}
        <Text style={styles.sectionTitle}>{tx("KYC Documents")}</Text>
        {documents.map((doc) => (
          <View key={doc.id} style={styles.docCard}>
            <Ionicons name={doc.icon} size={20} color="#15803D" style={styles.docIcon} />
            <View style={styles.docInfo}>
              <Text style={styles.docTitle}>{tx(doc.title)}</Text>
              <Text style={styles.docDetail}>{doc.detail}</Text>
            </View>
            <View style={styles.verifiedTag}>
              <Ionicons name="checkmark-done" size={14} color="#15803D" />
              <Text style={styles.verifiedText}>{tx("Verified")}</Text>
            </View>
          </View>
        ))}

        {/* --- SKILLS SECTION --- */}
        <Text style={styles.sectionTitle}>{tx("Your Skills")}</Text>
        <View style={styles.skillGrid}>
          {skills.map((skill) => (
            <View key={skill} style={styles.skillPill}>
              <Text style={styles.skillText}>{tx(skill)}</Text>
            </View>
          ))}
        </View>

        {/* --- ACTION BUTTON --- */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.mainButton}
          onPress={() => navigation.getParent()?.reset({
            index: 0,
            routes: [{ name: 'Main', params: { screen: 'HomeTab' } }],
          })}
        >
          <Text style={styles.buttonText}>{tx("Continue to Dashboard")}</Text>
          <Ionicons name="chevron-forward" size={18} color="#FFF" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4FAF2",
  },
  slimHero: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brandGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoSmall: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  brandTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },
  brandSubTitle: {
    color: "#BBF7D0",
    fontSize: 11,
    fontWeight: "700",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  statusBadgeText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "800",
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FBBF24",
    marginRight: 6,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  userSection: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E8F5E9",
    elevation: 2,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#102A18",
  },
  welcomeSub: {
    fontSize: 13,
    color: "#647A69",
    fontWeight: "600",
    marginTop: 2,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 15,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    backgroundColor: "#F1F5F2",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#16A34A",
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: "900",
    color: "#15803D",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#12351F",
    marginTop: 20,
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  segmentContainer: {
    flexDirection: "row",
    gap: 10,
  },
  segmentBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FFF",
    paddingVertical: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#DCEBDD",
  },
  segmentBtnActive: {
    backgroundColor: "#116834",
    borderColor: "#116834",
  },
  segmentText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#446451",
  },
  segmentTextActive: {
    color: "#FFF",
  },
  fpoCard: {
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#DCEBDD",
  },
  fpoMain: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  fpoTextContent: {
    flex: 1,
  },
  fpoId: {
    fontSize: 11,
    fontWeight: "900",
    color: "#16A34A",
  },
  fpoName: {
    fontSize: 16,
    fontWeight: "900",
    color: "#102A18",
  },
  docCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 15,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#DCEBDD",
  },
  docIcon: {
    width: 30,
  },
  docInfo: {
    flex: 1,
  },
  docTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: "#12351F",
  },
  docDetail: {
    fontSize: 12,
    color: "#647A69",
  },
  verifiedTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#E9FBEF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#15803D",
  },
  skillGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DCEBDD",
  },
  skillText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#116834",
  },
  mainButton: {
    marginTop: 30,
    backgroundColor: "#16A34A",
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 16,
    elevation: 3,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "900",
  },
});

export default KycSetupScreen;