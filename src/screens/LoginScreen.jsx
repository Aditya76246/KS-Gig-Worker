import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const LoginScreen = ({ navigation }) => {
  const [mobile, setMobile] = useState("9876543210");

  const handleSendOtp = () => {
    if (mobile.replace(/\D/g, "").length < 10) {
      alert("Enter valid mobile number");
      return;
    }

    navigation.navigate("Otp", { mobile });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/Images/Banner/splashBg.png")}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(3,10,6,0.22)", "rgba(4,17,8,0.72)", "rgba(2,8,4,0.96)"]}
          style={styles.gradient}
        >
          <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

          <View style={styles.topSection}>
            <View style={styles.logoRow}>
              <Image
                source={require("../../assets/Images/logo/iconpngplain.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <View>
                <Text style={styles.brand}>KisanSahakar</Text>
                <Text style={styles.brandSub}>Worker onboarding</Text>
              </View>
            </View>
            <Text style={styles.heroTitle}>Sign in with your mobile</Text>
            <Text style={styles.heroSubtitle}>Secure access to work, KYC, and nearby farm requests.</Text>
          </View>

          <View style={styles.bottomCard}>
            <View style={styles.dragHandle} />
            <Text style={styles.kicker}>Secure login</Text>
            <Text style={styles.title}>Enter mobile number</Text>
            <Text style={styles.copy}>
              We’ll send a one-time code to your phone to access the dashboard.
            </Text>

            <Text style={styles.label}>Mobile number</Text>
            <View style={styles.inputWrap}>
              <Text style={styles.country}>+91</Text>
              <TextInput
                keyboardType="number-pad"
                value={mobile}
                onChangeText={setMobile}
                maxLength={10}
                placeholder="Enter 10 digit number"
                placeholderTextColor="#8BA394"
                style={styles.input}
              />
            </View>

            <TouchableOpacity activeOpacity={0.86} style={styles.button} onPress={handleSendOtp}>
              <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>

            {/* <View style={styles.noteBox}>
              <Text style={styles.noteTitle}>Demo OTP</Text>
              <Text style={styles.noteText}>Use 1234 on the next screen.</Text>
            </View> */}
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    // paddingHorizontal: 22,
    paddingTop: 64,
    justifyContent: "space-between",
  },
  topSection: {
    marginBottom: 10,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  logo: {
    width: 54,
    height: 54,
  },
  brand: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
  },
  brandSub: {
    color: "#D4EDD9",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 2,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "900",
    lineHeight: 42,
    marginBottom: 10,
  },
  heroSubtitle: {
    color: "#CDEBD2",
    fontSize: 15,
    lineHeight: 22,
    maxWidth: "85%",
  },
  bottomCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    padding: 24,
    shadowColor: "#000000",
    shadowOpacity: 0.14,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
  },
  dragHandle: {
    width: 72,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#E5F7EA",
    alignSelf: "center",
    marginBottom: 18,
  },
  kicker: {
    color: "#15803D",
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  title: {
    color: "#102A18",
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "900",
    marginBottom: 10,
  },
  copy: {
    color: "#607769",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },
  label: {
    color: "#102A18",
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 12,
  },
  inputWrap: {
    minHeight: 58,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D1E8D4",
    backgroundColor: "#F8FFFA",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  country: {
    color: "#102A18",
    fontSize: 16,
    fontWeight: "900",
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: "#102A18",
    fontSize: 17,
    fontWeight: "800",
  },
  button: {
    minHeight: 58,
    borderRadius: 20,
    backgroundColor: "#16A34A",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
  },
  noteBox: {
    marginTop: 20,
    padding: 16,
    borderRadius: 18,
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#D1E8D4",
  },
  noteTitle: {
    color: "#166534",
    fontSize: 13,
    fontWeight: "900",
  },
  noteText: {
    color: "#166534",
    fontSize: 13,
    marginTop: 6,
  },
});

export default LoginScreen;
