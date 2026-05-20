import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import useHideTabBarOnScroll from "../hooks/useHideTabBarOnScroll";

const totals = [
  { label: "Confirmed", value: "Rs 12,480", icon: "checkmark-circle", tone: "#E9FBEF" },
  { label: "Pending", value: "Rs 1,970", icon: "time", tone: "#FFF4D8" },
  { label: "Withdrawn", value: "Rs 8,200", icon: "card", tone: "#E7F0FF" },
];

const paymentLogs = [
  {
    id: "PAY-101",
    title: "Paddy harvest cutting",
    meta: "Ramesh Patil - Online transfer",
    amount: "+Rs 850",
    status: "Confirmed",
    icon: "phone-portrait",
    color: "#15803D",
  },
  {
    id: "PAY-102",
    title: "Groundnut sorting",
    meta: "Green Valley FPO - Cash marked",
    amount: "+Rs 640",
    status: "Cash",
    icon: "cash",
    color: "#B45309",
  },
  {
    id: "PAY-103",
    title: "FPO settlement fee",
    meta: "Platform/FPO commission - 5 percent",
    amount: "-Rs 42",
    status: "Settled",
    icon: "receipt",
    color: "#64748B",
  },
  {
    id: "PAY-104",
    title: "Tomato packing group",
    meta: "Pending farmer confirmation",
    amount: "+Rs 1,120",
    status: "Pending",
    icon: "hourglass",
    color: "#D97706",
  },
];

const settlementRows = [
  { label: "Base wages", value: "Rs 14,492" },
  { label: "FPO commission", value: "-Rs 512" },
  { label: "Platform fee", value: "-Rs 300" },
  { label: "Net payable", value: "Rs 13,680", strong: true },
];

const EarningsScreen = () => {
  const insets = useSafeAreaInsets();
  const { bottomNavHidden, handleScroll } = useHideTabBarOnScroll();

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#0B3B21" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: bottomNavHidden ? insets.bottom + 22 : insets.bottom + 118 },
        ]}
        scrollEventThrottle={16}
        onScroll={handleScroll}
      >
        <LinearGradient
          colors={["#082F1B", "#116834", "#2F8C44"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.eyebrow}>Digital wallet</Text>
              <Text style={styles.title}>Earnings</Text>
            </View>
            <View style={styles.verifiedPill}>
              <Ionicons name="shield-checkmark" size={14} color="#BBF7D0" />
              <Text style={styles.verifiedText}>KYC verified</Text>
            </View>
          </View>

          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Available to withdraw</Text>
            <Text style={styles.balanceValue}>Rs 12,480</Text>
            <View style={styles.balanceMetaRow}>
              <View style={styles.balanceMeta}>
                <Ionicons name="business" size={13} color="#DCFCE7" />
                <Text style={styles.balanceMetaText}>SBI ending 9012</Text>
              </View>
              <View style={styles.balanceMeta}>
                <Ionicons name="sync" size={13} color="#DCFCE7" />
                <Text style={styles.balanceMetaText}>Synced today</Text>
              </View>
            </View>
          </View>

          <View style={styles.heroActions}>
            <TouchableOpacity activeOpacity={0.86} style={styles.primaryButton}>
              <MaterialCommunityIcons name="bank-transfer-out" size={20} color="#0B3B21" />
              <Text style={styles.primaryButtonText}>Withdraw</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.86} style={styles.voiceButton}>
              <MaterialCommunityIcons name="microphone" size={19} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.summaryGrid}>
          {totals.map((item) => (
            <View key={item.label} style={styles.summaryCard}>
              <View style={[styles.summaryIcon, { backgroundColor: item.tone }]}>
                <Ionicons name={item.icon} size={18} color="#15803D" />
              </View>
              <Text style={styles.summaryValue}>{item.value}</Text>
              <Text style={styles.summaryLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.noticeCard}>
          <View style={styles.noticeIcon}>
            <MaterialCommunityIcons name="cloud-check" size={22} color="#15803D" />
          </View>
          <View style={styles.noticeCopy}>
            <Text style={styles.noticeTitle}>Offline punch payments</Text>
            <Text style={styles.noticeText}>
              Punch-in records saved during weak internet will sync before final payout.
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Settlement summary</Text>
            <Text style={styles.sectionSubtitle}>FPO and platform commission auto-calculated</Text>
          </View>
        </View>

        <View style={styles.settlementCard}>
          {settlementRows.map((row) => (
            <View key={row.label} style={styles.settlementRow}>
              <Text style={[styles.settlementLabel, row.strong && styles.settlementStrong]}>
                {row.label}
              </Text>
              <Text style={[styles.settlementValue, row.strong && styles.settlementStrong]}>
                {row.value}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Payment log</Text>
            <Text style={styles.sectionSubtitle}>Cash and online transfer history</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} style={styles.filterPill}>
            <Ionicons name="filter" size={13} color="#15803D" />
            <Text style={styles.filterText}>All</Text>
          </TouchableOpacity>
        </View>

        {paymentLogs.map((log) => (
          <View key={log.id} style={styles.logCard}>
            <View style={[styles.logIcon, { backgroundColor: `${log.color}18` }]}>
              <MaterialCommunityIcons name={log.icon} size={21} color={log.color} />
            </View>
            <View style={styles.logCopy}>
              <Text style={styles.logTitle}>{log.title}</Text>
              <Text style={styles.logMeta}>{log.meta}</Text>
              <View style={styles.statusPill}>
                <Text style={styles.statusText}>{log.status}</Text>
              </View>
            </View>
            <Text style={[styles.logAmount, log.amount.startsWith("-") && styles.logDebit]}>
              {log.amount}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F4FAF2",
  },
  content: {
    backgroundColor: "#F4FAF2",
  },
  hero: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 28,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  heroTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  eyebrow: {
    color: "#BBF7D0",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "900",
    marginTop: 2,
  },
  verifiedPill: {
    minHeight: 32,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.13)",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  verifiedText: {
    color: "#ECFDF5",
    fontSize: 11,
    fontWeight: "900",
  },
  balanceCard: {
    marginTop: 18,
    padding: 18,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.13)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.17)",
  },
  balanceLabel: {
    color: "#D7F5DE",
    fontSize: 13,
    fontWeight: "800",
  },
  balanceValue: {
    color: "#FFFFFF",
    fontSize: 38,
    lineHeight: 45,
    fontWeight: "900",
    marginTop: 6,
  },
  balanceMetaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  balanceMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  balanceMetaText: {
    color: "#ECFDF5",
    fontSize: 11,
    fontWeight: "800",
  },
  heroActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  primaryButton: {
    flex: 1,
    minHeight: 52,
    borderRadius: 18,
    backgroundColor: "#FBBF24",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  primaryButtonText: {
    color: "#0B3B21",
    fontSize: 15,
    fontWeight: "900",
  },
  voiceButton: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  summaryGrid: {
    flexDirection: "row",
    gap: 10,
    marginHorizontal: 20,
    marginTop: 18,
  },
  summaryCard: {
    flex: 1,
    minHeight: 104,
    padding: 12,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCEBDD",
    justifyContent: "center",
  },
  summaryIcon: {
    width: 34,
    height: 34,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  summaryValue: {
    color: "#102A18",
    fontSize: 15,
    fontWeight: "900",
    marginTop: 9,
  },
  summaryLabel: {
    color: "#647A69",
    fontSize: 11,
    fontWeight: "800",
    marginTop: 4,
  },
  noticeCard: {
    marginHorizontal: 20,
    marginTop: 14,
    padding: 14,
    borderRadius: 20,
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    flexDirection: "row",
    gap: 12,
  },
  noticeIcon: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  noticeCopy: {
    flex: 1,
  },
  noticeTitle: {
    color: "#14532D",
    fontSize: 15,
    fontWeight: "900",
  },
  noticeText: {
    color: "#42634E",
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "700",
    marginTop: 4,
  },
  sectionHeader: {
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  sectionTitle: {
    color: "#12351F",
    fontSize: 19,
    fontWeight: "900",
  },
  sectionSubtitle: {
    color: "#647A69",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 3,
  },
  settlementCard: {
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCEBDD",
  },
  settlementRow: {
    minHeight: 38,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#EDF5EF",
  },
  settlementLabel: {
    color: "#647A69",
    fontSize: 13,
    fontWeight: "800",
  },
  settlementValue: {
    color: "#12351F",
    fontSize: 13,
    fontWeight: "900",
  },
  settlementStrong: {
    color: "#15803D",
    fontSize: 15,
  },
  filterPill: {
    minHeight: 34,
    paddingHorizontal: 11,
    borderRadius: 999,
    backgroundColor: "#E9FBEF",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  filterText: {
    color: "#15803D",
    fontSize: 12,
    fontWeight: "900",
  },
  logCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 14,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCEBDD",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  logCopy: {
    flex: 1,
  },
  logTitle: {
    color: "#12351F",
    fontSize: 14,
    fontWeight: "900",
  },
  logMeta: {
    color: "#647A69",
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "700",
    marginTop: 3,
  },
  statusPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#F1F7F0",
    marginTop: 7,
  },
  statusText: {
    color: "#356246",
    fontSize: 10,
    fontWeight: "900",
  },
  logAmount: {
    color: "#15803D",
    fontSize: 14,
    fontWeight: "900",
  },
  logDebit: {
    color: "#64748B",
  },
});

export default EarningsScreen;
