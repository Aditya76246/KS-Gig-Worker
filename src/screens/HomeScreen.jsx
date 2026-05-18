import React, { useMemo, useState } from "react";
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
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const jobs = [
  {
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
  },
  {
    id: "JOB-1847",
    crop: "Tomato",
    type: "Sorting and packing",
    farmer: "Green Valley FPO",
    village: "Mandya road",
    pay: "Rs 110/hour",
    distance: "4.1 km",
    time: "Tomorrow, 9:00 AM",
    workers: "12 worker group",
    rating: "4.9",
    image: require("../../assets/Images/Banner/Slider-3.png"),
  },
];

const tasks = [
  { title: "Sugarcane loading", date: "18 May", status: "Punch-out pending", amount: "Rs 920" },
  { title: "Groundnut sorting", date: "16 May", status: "Payment received", amount: "Rs 640" },
  { title: "Cotton picking", date: "14 May", status: "Synced offline entry", amount: "Rs 780" },
];

const walletLogs = [
  { label: "Online transfer", detail: "Paddy harvesting", value: "+Rs 850" },
  { label: "Cash marked", detail: "Groundnut sorting", value: "+Rs 640" },
  { label: "FPO commission", detail: "Settlement fee", value: "-Rs 42" },
];

const tabs = [
  { key: "Home", label: "Home", icon: "home" },
  { key: "Tasks", label: "Tasks", icon: "clipboard-list" },
  { key: "Wallet", label: "Wallet", icon: "wallet" },
  { key: "Help", label: "Help", icon: "help-circle" },
];

const HomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Home");
  const [dutyOn, setDutyOn] = useState(true);

  const summary = useMemo(
    () => [
      { label: "Confirmed", value: "Rs 12,480" },
      { label: "Pending", value: "Rs 1,970" },
      { label: "Withdrawn", value: "Rs 8,200" },
    ],
    []
  );

  const renderHome = () => (
    <>
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
              <Text style={styles.brandSub}>Gig Worker App</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate("Profile") }>
            <MaterialIcons name="person" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.greetingSection}>
          <Text style={styles.greeting}>Namaste, Aditya soni</Text>
          <Text style={styles.role}>Verified gig worker near Vijayapura</Text>
        </View>

        <View style={styles.dutyCard}>
          <View>
            <Text style={styles.dutyLabel}>Duty status</Text>
            <Text style={styles.dutyValue}>{dutyOn ? "Available for nearby work" : "You are off duty"}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.toggle, dutyOn && styles.toggleActive]}
            onPress={() => setDutyOn((value) => !value)}
          >
            <View style={[styles.toggleKnob, dutyOn && styles.toggleKnobActive]} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.mapCard}>
        <Image
          source={require("../../assets/Images/Banner/Slider-4.png")}
          style={styles.mapImage}
          resizeMode="cover"
        />
        <View style={styles.mapOverlay}>
          <Text style={styles.mapTitle}>Nearby farm cluster</Text>
          <Text style={styles.mapCopy}>3 active requests within 5 km</Text>
        </View>
      </View>

      <View style={styles.summaryGrid}>
        {summary.map((item) => (
          <View key={item.label} style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{item.value}</Text>
            <Text style={styles.summaryLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Nearby job alerts</Text>
        <Text style={styles.sectionAction}>Live</Text>
      </View>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} navigation={navigation} />
      ))}
    </>
  );

  const renderTasks = () => (
    <View>
      <Text style={styles.pageTitle}>My Tasks</Text>
      <Text style={styles.pageCopy}>Current and past work history for wage records.</Text>
      {tasks.map((task) => (
        <View key={task.title} style={styles.taskCard}>
          <View>
            <Text style={styles.taskTitle}>{task.title}</Text>
            <Text style={styles.taskMeta}>{task.date} - {task.status}</Text>
          </View>
          <Text style={styles.taskAmount}>{task.amount}</Text>
        </View>
      ))}
      <View style={styles.offlineCard}>
        <Text style={styles.offlineTitle}>Offline punch saved</Text>
        <Text style={styles.offlineCopy}>
          If internet is weak, punch-in and punch-out stay on device and sync when network returns.
        </Text>
      </View>
    </View>
  );

  const renderWallet = () => (
    <View>
      <Text style={styles.pageTitle}>Wallet</Text>
      <Text style={styles.pageCopy}>Track cash, online transfer, and FPO settlement.</Text>
      <LinearGradient colors={["#173D23", "#14532D"]} style={styles.walletCard}>
        <Text style={styles.walletLabel}>Confirmed earnings</Text>
        <Text style={styles.walletAmount}>Rs 12,480</Text>
        <Text style={styles.walletCopy}>Linked bank: SBI ending 9012</Text>
      </LinearGradient>
      {walletLogs.map((log) => (
        <View key={log.label} style={styles.walletRow}>
          <View>
            <Text style={styles.walletRowTitle}>{log.label}</Text>
            <Text style={styles.walletRowDetail}>{log.detail}</Text>
          </View>
          <Text style={styles.walletRowValue}>{log.value}</Text>
        </View>
      ))}
    </View>
  );

  const renderHelp = () => (
    <View>
      <Text style={styles.pageTitle}>Help and Support</Text>
      <Text style={styles.pageCopy}>Voice-first actions and direct FPO support for low-literacy workers.</Text>
      <View style={styles.helpCard}>
        <Text style={styles.helpTitle}>Voice command</Text>
        <Text style={styles.helpCopy}>Say: "Show nearby work", "Punch in", or "Call FPO".</Text>
        <TouchableOpacity activeOpacity={0.85} style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Start Voice Help</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.helpCard}>
        <Text style={styles.helpTitle}>FPO/Admin support</Text>
        <Text style={styles.helpCopy}>Kisan Green Producer Company support desk is available 8 AM to 8 PM.</Text>
        <TouchableOpacity activeOpacity={0.85} style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Call Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const screenContent = {
    Home: renderHome,
    Tasks: renderTasks,
    Wallet: renderWallet,
    Help: renderHelp,
  }[activeTab];

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#0F3D22" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {screenContent()}
      </ScrollView>

      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.85}
            style={[styles.tabItem, activeTab === tab.key && styles.tabItemActive]}
            onPress={() => setActiveTab(tab.key)}
          >
            <MaterialCommunityIcons
              name={tab.icon}
              size={20}
              color={activeTab === tab.key ? "#166534" : "#6A8170"}
            />
            <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.profileTab}
          onPress={() => navigation.navigate("Profile")}
        >
          <MaterialIcons
            name="person"
            size={20}
            color="#6A8170"
          />
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const JobCard = ({ job, navigation }) => (
  <TouchableOpacity
    activeOpacity={0.9}
    style={styles.jobCard}
    onPress={() => navigation.navigate("JobDetails", { job })}
  >
    <Image source={job.image} style={styles.jobImage} resizeMode="cover" />
    <View style={styles.jobBody}>
      <View style={styles.jobHeader}>
        <Text style={styles.jobType}>{job.type}</Text>
        <Text style={styles.jobPay}>{job.pay}</Text>
      </View>
      <Text style={styles.jobMeta}>{job.crop} - {job.village} - {job.distance}</Text>
      <Text style={styles.jobMeta}>{job.time} - {job.workers}</Text>
      <View style={styles.jobFooter}>
        <Text style={styles.rating}>Farmer rating {job.rating}</Text>
        <Text style={styles.viewDetails}>View details</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5FBF6",
  },
  scrollContent: {
    paddingBottom: 104,
  },
  hero: {
    paddingTop: 58,
    paddingHorizontal: 22,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  heroTop: {
    flexDirection: "column",
    gap: 16,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  heroHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 20,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  profileShortcutIcon: {
    width: 24,
    height: 24,
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
  greetingSection: {
    marginBottom: 8,
  },
  greeting: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "900",
  },
  role: {
    color: "#CDEBD2",
    fontSize: 13,
    marginTop: 5,
    fontWeight: "700",
  },
  dutyCard: {
    marginTop: 24,
    padding: 16,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dutyLabel: {
    color: "#BBF7D0",
    fontSize: 12,
    fontWeight: "900",
  },
  dutyValue: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
    marginTop: 4,
  },
  toggle: {
    width: 62,
    height: 34,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.28)",
    padding: 4,
  },
  toggleActive: {
    backgroundColor: "#BBF7D0",
  },
  toggleKnob: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
  },
  toggleKnobActive: {
    marginLeft: 28,
    backgroundColor: "#16A34A",
  },
  mapCard: {
    marginHorizontal: 22,
    marginTop: 20,
    height: 150,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#DDEFE2",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.18)",
  },
  mapTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },
  mapCopy: {
    color: "#E9FBEF",
    fontSize: 13,
    marginTop: 3,
    fontWeight: "700",
  },
  summaryGrid: {
    flexDirection: "row",
    gap: 10,
    marginHorizontal: 22,
    marginTop: 16,
  },
  summaryCard: {
    flex: 1,
    padding: 13,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E1F0E6",
  },
  summaryValue: {
    color: "#102A18",
    fontSize: 15,
    fontWeight: "900",
  },
  summaryLabel: {
    color: "#6A8170",
    fontSize: 11,
    marginTop: 4,
    fontWeight: "800",
  },
  sectionHeader: {
    marginHorizontal: 22,
    marginTop: 26,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    color: "#14351F",
    fontSize: 19,
    fontWeight: "900",
  },
  sectionAction: {
    color: "#16A34A",
    fontSize: 13,
    fontWeight: "900",
  },
  jobCard: {
    marginHorizontal: 22,
    marginBottom: 14,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E1F0E6",
  },
  jobImage: {
    width: "100%",
    height: 118,
  },
  jobBody: {
    padding: 15,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  jobType: {
    flex: 1,
    color: "#14351F",
    fontSize: 17,
    fontWeight: "900",
  },
  jobPay: {
    color: "#15803D",
    fontSize: 15,
    fontWeight: "900",
  },
  jobMeta: {
    color: "#6A8170",
    fontSize: 13,
    marginTop: 6,
  },
  jobFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  rating: {
    color: "#4D6656",
    fontSize: 12,
    fontWeight: "800",
  },
  viewDetails: {
    color: "#16A34A",
    fontSize: 12,
    fontWeight: "900",
  },
  pageTitle: {
    color: "#102A18",
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "900",
    marginHorizontal: 22,
    marginTop: 62,
  },
  pageCopy: {
    color: "#607769",
    fontSize: 15,
    lineHeight: 22,
    marginHorizontal: 22,
    marginTop: 8,
    marginBottom: 20,
  },
  taskCard: {
    marginHorizontal: 22,
    marginBottom: 12,
    padding: 16,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E1F0E6",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  taskTitle: {
    color: "#14351F",
    fontSize: 16,
    fontWeight: "900",
  },
  taskMeta: {
    color: "#6A8170",
    fontSize: 13,
    marginTop: 5,
  },
  taskAmount: {
    color: "#15803D",
    fontSize: 15,
    fontWeight: "900",
  },
  offlineCard: {
    marginHorizontal: 22,
    marginTop: 8,
    padding: 18,
    borderRadius: 22,
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  offlineTitle: {
    color: "#166534",
    fontSize: 16,
    fontWeight: "900",
  },
  offlineCopy: {
    color: "#42634E",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 6,
  },
  walletCard: {
    marginHorizontal: 22,
    padding: 22,
    borderRadius: 24,
  },
  walletLabel: {
    color: "#BBF7D0",
    fontSize: 13,
    fontWeight: "900",
  },
  walletAmount: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "900",
    marginTop: 8,
  },
  walletCopy: {
    color: "#D8F3DE",
    fontSize: 13,
    marginTop: 6,
  },
  walletRow: {
    marginHorizontal: 22,
    marginTop: 12,
    padding: 16,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E1F0E6",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  walletRowTitle: {
    color: "#14351F",
    fontSize: 15,
    fontWeight: "900",
  },
  walletRowDetail: {
    color: "#6A8170",
    fontSize: 13,
    marginTop: 4,
  },
  walletRowValue: {
    color: "#15803D",
    fontSize: 15,
    fontWeight: "900",
  },
  helpCard: {
    marginHorizontal: 22,
    marginBottom: 14,
    padding: 18,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E1F0E6",
  },
  helpTitle: {
    color: "#14351F",
    fontSize: 17,
    fontWeight: "900",
  },
  helpCopy: {
    color: "#607769",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
  secondaryButton: {
    minHeight: 46,
    borderRadius: 14,
    backgroundColor: "#E9FBEF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },
  secondaryButtonText: {
    color: "#166534",
    fontSize: 14,
    fontWeight: "900",
  },
  tabBar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 18,
    minHeight: 64,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDEFE2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    shadowColor: "#052E16",
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  tabItem: {
    minHeight: 42,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    gap: 4,
  },
  profileTab: {
    minHeight: 42,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    gap: 4,
  },
  tabItemActive: {
    backgroundColor: "#E9FBEF",
  },
  tabText: {
    color: "#6A8170",
    fontSize: 12,
    fontWeight: "900",
  },
  tabTextActive: {
    color: "#166534",
  },
});

export default HomeScreen;
