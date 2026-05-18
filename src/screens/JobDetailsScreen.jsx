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
  image: require("../../assets/Images/Banner/Slider-2.png"),
};

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
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.crop}>{job.crop}</Text>
              <Text style={styles.title}>{job.type}</Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.payCard}>
          <View>
            <Text style={styles.payLabel}>Worker pay</Text>
            <Text style={styles.payValue}>{job.pay}</Text>
          </View>
          <View style={styles.distanceBadge}>
            <Text style={styles.distanceText}>{job.distance}</Text>
          </View>
        </View>

        <View style={styles.infoGrid}>
          <Info label="Farmer" value={job.farmer} />
          <Info label="Village" value={job.village} />
          <Info label="Start" value={job.time} />
          <Info label="Team" value={job.workers} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Job lifecycle</Text>
          {steps.map((step, index) => (
            <View key={step.title} style={styles.stepRow}>
              <View style={styles.stepDot}>
                <Text style={styles.stepDotText}>{index + 1}</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDetail}>{step.detail}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pricing and settlement</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Base wage</Text>
            <Text style={styles.priceValue}>{job.pay}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Platform/FPO commission</Text>
            <Text style={styles.priceValue}>5 percent</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Payment mode</Text>
            <Text style={styles.priceValue}>Cash or online</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Completion proof</Text>
          <Text style={styles.cardCopy}>
            Upload one farm photo after work completion. This static demo shows the flow only.
          </Text>
          <TouchableOpacity activeOpacity={0.85} style={styles.outlineButton}>
            <Text style={styles.outlineButtonText}>Add Proof Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            activeOpacity={0.86}
            style={[styles.primaryButton, accepted && styles.primaryButtonMuted]}
            onPress={() => setAccepted(true)}
          >
            <Text style={styles.primaryButtonText}>{accepted ? "Job Accepted" : "Accept Job"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.86}
            style={styles.secondaryButton}
            onPress={() => setPunchedIn((value) => !value)}
          >
            <Text style={styles.secondaryButtonText}>{punchedIn ? "Punch Out" : "GPS Punch In"}</Text>
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
