import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const OtpScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState("1234");
  const mobile = route.params?.mobile || "9876543210";

  const handleVerifyOtp = () => {
    if (otp === "1234") {
      navigation.replace("KycSetup");
    } else {
      alert("Invalid OTP. Use 1234 for this demo.");
    }
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
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.heroTitle}>OTP verification</Text>
            <Text style={styles.heroSubtitle}>Enter the 4-digit code sent to your mobile number.</Text>
          </View>

          <View style={styles.bottomCard}>
            <View style={styles.dragHandle} />
            <Text style={styles.kicker}>One-time code</Text>
            <Text style={styles.title}>Confirm your identity</Text>
            <Text style={styles.copy}>A code has been sent to +91 {mobile}. Enter it below to continue.</Text>

            <TextInput
              keyboardType="number-pad"
              value={otp}
              onChangeText={setOtp}
              maxLength={4}
              placeholder="1234"
              placeholderTextColor="#8BA394"
              style={styles.otpInput}
            />

            <TouchableOpacity activeOpacity={0.86} style={styles.button} onPress={handleVerifyOtp}>
              <Text style={styles.buttonText}>Verify and Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resend}>
              <Text style={styles.resendText}>Resend OTP in 25s</Text>
            </TouchableOpacity>
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
    paddingTop: 52,
    justifyContent: "space-between",
  },
  topSection: {
    marginBottom: 10,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    marginBottom: 24,
  },
  backText: {
    color: "#FFFFFF",
    fontWeight: "900",
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "900",
    lineHeight: 38,
    marginBottom: 10,
  },
  heroSubtitle: {
    color: "#CDEBD2",
    fontSize: 15,
    lineHeight: 22,
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
  otpInput: {
    minHeight: 64,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D1E8D4",
    backgroundColor: "#F8FFFA",
    color: "#102A18",
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 10,
    textAlign: "center",
    marginTop: 6,
  },
  button: {
    minHeight: 58,
    borderRadius: 20,
    backgroundColor: "#16A34A",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
  },
  resend: {
    alignItems: "center",
    marginTop: 18,
  },
  resendText: {
    color: "#15803D",
    fontSize: 14,
    fontWeight: "800",
  },
});

export default OtpScreen;
