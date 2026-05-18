import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState("Aditya soni");
  const [mobile, setMobile] = useState("9876543210");
  const [village, setVillage] = useState("Vijayapura");
  const [profileType, setProfileType] = useState("Individual");
  const [affiliation, setAffiliation] = useState("Under FPO");
  const [language, setLanguage] = useState("English");
  const languageOptions = ["English", "Hindi", "Telugu", "Kannada"];

  const handleSave = () => {
    alert("Profile updated successfully");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F3D22" />
      <LinearGradient colors={["#0F3D22", "#166534"]} style={styles.hero}>
        <View style={styles.heroHeader}>
          <View style={styles.logoRow}>
            <Image
              source={require("../../assets/Images/logo/iconpngplain.png")}
              style={styles.logoIcon}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.brand}>KisanSahakar</Text>
              <Text style={styles.brandSub}>Worker profile</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
            <Text style={styles.closeButtonText}>Back</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.heroTitle}>My Profile</Text>
        <Text style={styles.heroSubtitle}>Review and update your farm work details.</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.profilePhoto}>
            <Image
              source={require("../../assets/Images/logo/Mob-icon.png")}
              style={styles.profilePhotoIcon}
              resizeMode="contain"
            />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{name}</Text>
            <Text style={styles.profileMeta}>Verified gig worker</Text>
          </View>
          <TouchableOpacity style={styles.editPhotoButton} activeOpacity={0.85}>
            <Text style={styles.editPhotoText}>Change</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Full name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter name"
            placeholderTextColor="#8BA394"
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Mobile number</Text>
          <TextInput
            style={styles.input}
            value={mobile}
            onChangeText={setMobile}
            keyboardType="number-pad"
            placeholder="9876543210"
            placeholderTextColor="#8BA394"
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Village / location</Text>
          <TextInput
            style={styles.input}
            value={village}
            onChangeText={setVillage}
            placeholder="Vijayapura"
            placeholderTextColor="#8BA394"
          />
        </View>

        <View style={styles.profileRow}>
          <View style={styles.chipCard}>
            <Text style={styles.chipLabel}>Profile type</Text>
            <Text style={styles.chipValue}>{profileType}</Text>
          </View>
          <View style={styles.chipCard}>
            <Text style={styles.chipLabel}>Affiliation</Text>
            <Text style={styles.chipValue}>{affiliation}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>App language</Text>
        <View style={styles.languageOptions}>
          {languageOptions.map((option) => (
            <TouchableOpacity
              key={option}
              activeOpacity={0.85}
              style={[
                styles.languageButton,
                language === option && styles.languageButtonActive,
              ]}
              onPress={() => setLanguage(option)}
            >
              <Text
                style={
                  language === option
                    ? styles.languageButtonTextActive
                    : styles.languageButtonText
                }
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillGrid}>
          {[
            "Sowing",
            "Weeding",
            "Harvesting",
            "Loading",
            "Sorting",
          ].map((skill) => (
            <View key={skill} style={styles.skillPill}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.saveButton} activeOpacity={0.88} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save profile</Text>
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
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  heroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoIcon: {
    width: 54,
    height: 54,
  },
  brand: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
  },
  brandSub: {
    color: "#CDEBD2",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 2,
  },
  closeButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 13,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 8,
  },
  heroSubtitle: {
    color: "#CDEBD2",
    fontSize: 14,
    lineHeight: 20,
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 32,
  },
  profileCard: {
    marginBottom: 20,
    padding: 18,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E1F0E6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profilePhoto: {
    width: 70,
    height: 70,
    borderRadius: 22,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center",
  },
  profilePhotoIcon: {
    width: 38,
    height: 38,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 14,
  },
  profileName: {
    color: "#102A18",
    fontSize: 18,
    fontWeight: "900",
  },
  profileMeta: {
    color: "#5D7666",
    fontSize: 13,
    marginTop: 6,
  },
  editPhotoButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: "#ECFDF5",
  },
  editPhotoText: {
    color: "#166534",
    fontSize: 13,
    fontWeight: "900",
  },
  fieldGroup: {
    marginBottom: 18,
  },
  label: {
    color: "#173D23",
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 8,
  },
  input: {
    minHeight: 54,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#D1E8D4",
    backgroundColor: "#F8FFFA",
    paddingHorizontal: 16,
    color: "#102A18",
    fontSize: 15,
    fontWeight: "700",
  },
  profileRow: {
    flexDirection: "row",
    gap: 10,
  },
  chipCard: {
    flex: 1,
    padding: 16,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1E8D4",
  },
  chipLabel: {
    color: "#6A8170",
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  chipValue: {
    color: "#102A18",
    fontSize: 15,
    fontWeight: "900",
    marginTop: 8,
  },
  sectionTitle: {
    color: "#163B22",
    fontSize: 16,
    fontWeight: "900",
    marginTop: 24,
    marginBottom: 12,
  },
  skillGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  skillPill: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: "#E9FBEF",
    marginBottom: 10,
  },
  skillText: {
    color: "#166534",
    fontSize: 13,
    fontWeight: "900",
  },
  languageOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 18,
  },
  languageButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#D1E8D4",
    backgroundColor: "#F8FFFA",
  },
  languageButtonActive: {
    backgroundColor: "#ECFDF5",
    borderColor: "#16A34A",
  },
  languageButtonText: {
    color: "#102A18",
    fontSize: 13,
    fontWeight: "900",
  },
  languageButtonTextActive: {
    color: "#166534",
    fontSize: 13,
    fontWeight: "900",
  },
  saveButton: {
    marginTop: 26,
    minHeight: 58,
    borderRadius: 18,
    backgroundColor: "#16A34A",
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
  },
});

export default ProfileScreen;
