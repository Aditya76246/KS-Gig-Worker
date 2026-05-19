// import React, { useState } from 'react';
// import {
//   View,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
// import Animated, { FadeInDown } from 'react-native-reanimated';

// import CustomText from '../components/CustomText';
// import globalStyles from '../styles/globalStyles';
// import { color } from '../styles/theme';

// // ─── Mock Data ────────────────────────────────────────────────────────────────
// const BOOKING_REQUESTS = [
//   {
//     id: '1',
//     name: 'Suresh Reddy',
//     service: 'Threshing Request',
//     estimate: '₹1,200 Est.',
//     equipment: 'John Deere 5050D',
//     area: '4.5 Acres',
//     distance: '2.4 km away',
//     timing: 'Starts 10:30 AM',
//     avatar: null,
//   },
//   {
//     id: '2',
//     name: 'Vikas Patel',
//     service: 'Ploughing Request',
//     estimate: '₹850 Est.',
//     equipment: 'Mahindra 575',
//     area: '3.0 Acres',
//     distance: '1.8 km away',
//     timing: 'Starts 12:00 PM',
//     avatar: null,
//   },
// ];

// const QUICK_ACTIONS = [
//   { id: 'BookingsTab', label: 'My Trips', icon: 'clipboard-list', lib: 'FontAwesome5', color: color.GREEN, bg: color.GREEN_LIGHT },
//   { id: 'EarningsTab', label: 'Earnings', icon: 'cash-multiple', lib: 'MaterialCommunityIcons', color: color.YELLOW_TEXT, bg: color.YELLOW_BG },
//   { id: 'FuelTab', label: 'Fuel Log', icon: 'gas-station', lib: 'MaterialCommunityIcons', color: '#923357', bg: '#fce4ec' },
//   { id: 'SupportTab', label: 'Support', icon: 'headset', lib: 'MaterialCommunityIcons', color: color.TEXT_SUB, bg: color.AVATAR_BG },
// ];

// // ─── Sub-components ───────────────────────────────────────────────────────────

// function ProfileBanner({ onPress }) {
//   return (
//     <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.profileBanner}>
//       <View style={styles.profileBannerLeft}>
//         <View style={styles.profileWarningIcon}>
//           <Ionicons name="person-circle-outline" size={28} color={color.GREEN} />
//         </View>
//         <View style={{ flex: 1 }}>
//           <CustomText style={styles.profileBannerTitle}>Complete Your Profile & KYC</CustomText>
//           <CustomText style={styles.profileBannerSub}>Verify your details to start accepting jobs</CustomText>
//         </View>
//       </View>
//       <TouchableOpacity style={styles.profileBannerBtn} onPress={onPress} activeOpacity={0.8}>
//         <CustomText style={styles.profileBannerBtnText}>Update</CustomText>
//         <Ionicons name="arrow-forward" size={14} color={color.WHITE} style={{ marginLeft: 4 }} />
//       </TouchableOpacity>
//     </Animated.View>
//   );
// }

// function StatCard({ title, value, subtitle, progress, goal, delay = 0 }) {
//   return (
//     <Animated.View entering={FadeInDown.delay(delay).duration(400)} style={styles.statCard}>
//       <CustomText style={styles.statCardTitle}>{title}</CustomText>
//       <CustomText style={styles.statCardValue}>{value}</CustomText>
//       {subtitle ? (
//         <View style={styles.statSubRow}>
//           <Ionicons name="trending-up" size={14} color={color.GREEN} />
//           <CustomText style={styles.statSubText}>{subtitle}</CustomText>
//         </View>
//       ) : null}
//       {progress !== undefined ? (
//         <>
//           <CustomText style={styles.statGoalText}>
//             {Math.round(progress * 12)} / {goal} Goal
//           </CustomText>
//           <View style={styles.progressTrack}>
//             <View style={[styles.progressFill, { flex: progress }]} />
//             <View style={{ flex: 1 - progress }} />
//           </View>
//         </>
//       ) : null}
//     </Animated.View>
//   );
// }

// function QuickActionButton({ action, onPress }) {
//   const IconComp =
//     action.lib === 'MaterialCommunityIcons'
//       ? MaterialCommunityIcons
//       : FontAwesome5;
//   return (
//     <TouchableOpacity style={styles.qaButton} onPress={onPress} activeOpacity={0.75}>
//       <View style={[styles.qaIconBox, { backgroundColor: action.bg }]}>
//         <IconComp name={action.icon} size={22} color={action.color} />
//       </View>
//       <CustomText style={styles.qaLabel}>{action.label}</CustomText>
//     </TouchableOpacity>
//   );
// }

// function BookingCard({ booking, onAccept, onReject, delay = 0 }) {
//   return (
//     <Animated.View entering={FadeInDown.delay(delay).duration(400)} style={styles.bookingCard}>
//       {/* Header */}
//       <View style={styles.bookingHeader}>
//         <View style={styles.bookingAvatar}>
//           <Ionicons name="person" size={28} color="#aaa" />
//         </View>
//         <View style={{ flex: 1, marginLeft: 12 }}>
//           <CustomText style={styles.bookingName}>{booking.name}</CustomText>
//           <CustomText style={styles.bookingService}>{booking.service}</CustomText>
//         </View>
//         <View style={styles.estimateBadge}>
//           <CustomText style={styles.estimateText}>{booking.estimate}</CustomText>
//         </View>
//       </View>

//       {/* Details Grid */}
//       <View style={styles.bookingDetails}>
//         <View style={styles.detailItem}>
//           <MaterialCommunityIcons name="tractor" size={16} color={color.GREEN} />
//           <View style={{ marginLeft: 6 }}>
//             <CustomText style={styles.detailLabel}>EQUIPMENT</CustomText>
//             <CustomText style={styles.detailValue}>{booking.equipment}</CustomText>
//           </View>
//         </View>
//         <View style={styles.detailItem}>
//           <MaterialCommunityIcons name="grid" size={16} color={color.GREEN} />
//           <View style={{ marginLeft: 6 }}>
//             <CustomText style={styles.detailLabel}>AREA</CustomText>
//             <CustomText style={styles.detailValue}>{booking.area}</CustomText>
//           </View>
//         </View>
//         <View style={styles.detailItem}>
//           <Ionicons name="location-outline" size={16} color={color.GREEN} />
//           <View style={{ marginLeft: 6 }}>
//             <CustomText style={styles.detailLabel}>DISTANCE</CustomText>
//             <CustomText style={styles.detailValue}>{booking.distance}</CustomText>
//           </View>
//         </View>
//         <View style={styles.detailItem}>
//           <Ionicons name="time-outline" size={16} color={color.GREEN} />
//           <View style={{ marginLeft: 6 }}>
//             <CustomText style={styles.detailLabel}>TIMING</CustomText>
//             <CustomText style={styles.detailValue}>{booking.timing}</CustomText>
//           </View>
//         </View>
//       </View>

//       {/* Actions */}
//       <View style={styles.bookingActions}>
//         <TouchableOpacity style={styles.rejectBtn} onPress={() => onReject(booking.id)} activeOpacity={0.8}>
//           <CustomText style={styles.rejectText}>Reject</CustomText>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.acceptBtn} onPress={() => onAccept(booking.id)} activeOpacity={0.8}>
//           <CustomText style={styles.acceptText}>Accept</CustomText>
//         </TouchableOpacity>
//       </View>
//     </Animated.View>
//   );
// }

// // ─── Main Screen ──────────────────────────────────────────────────────────────

// export default function HomeScreen({ navigation }) {
//   const [bookings, setBookings] = useState(BOOKING_REQUESTS);
//   const [profileComplete] = useState(false);

//   const handleAccept = (id) => {
//     setBookings((prev) => prev.filter((b) => b.id !== id));
//   };

//   const handleReject = (id) => {
//     setBookings((prev) => prev.filter((b) => b.id !== id));
//   };

//   return (
//     <View style={styles.root}>
//       <ScrollView
//         style={styles.scroll}
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={styles.bgDark}>
//           {/* Profile completion banner */}
//           {!profileComplete && (
//             <ProfileBanner onPress={() => navigation.navigate('ProfileTab', { screen: 'PersonalInfo', initial: false })} />
//           )}

//           {/* Stats Row */}
//           <View style={styles.statsRow}>
//             <StatCard
//               title="Today Earnings"
//               value="₹2,450"
//               subtitle="12% vs yesterday"
//               delay={150}
//             />
//             <StatCard
//               title="Trips Completed"
//               value="08"
//               progress={8 / 12}
//               goal={12}
//               delay={200}
//             />
//           </View>
//         </View>
//         {/* Quick Actions */}
//         <Animated.View entering={FadeInDown.delay(250).duration(400)} style={styles.section}>
//           <CustomText style={styles.sectionTitle}>Quick Actions</CustomText>
//           <View style={styles.qaRow}>
//             {QUICK_ACTIONS.map((action) => (
//               <QuickActionButton
//                 key={action.id}
//                 action={action}
//                 onPress={() => navigation.navigate(action.id)}
//               />
//             ))}
//           </View>
//         </Animated.View>

//         {/* Booking Requests */}
//         <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <CustomText style={styles.sectionTitle}>New Booking Requests</CustomText>
//             <TouchableOpacity onPress={() => navigation.navigate('BookingsTab')}>
//               <CustomText style={styles.seeAll}>See All</CustomText>
//             </TouchableOpacity>
//           </View>

//           {bookings.length === 0 ? (
//             <View style={styles.emptyState}>
//               <Ionicons name="checkmark-circle-outline" size={48} color={color.BORDER} />
//               <CustomText style={styles.emptyText}>No new booking requests</CustomText>
//             </View>
//           ) : (
//             bookings.map((b, i) => (
//               <BookingCard
//                 key={b.id}
//                 booking={b}
//                 onAccept={handleAccept}
//                 onReject={handleReject}
//                 delay={320 + i * 60}
//               />
//             ))
//           )}
//         </Animated.View>
//       </ScrollView>
//     </View>
//   );
// }

// // ─── Styles ───────────────────────────────────────────────────────────────────

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     backgroundColor: color.SURFACE,
//   },

//   // ── Scroll ──
//   scroll: { flex: 1 },
//   scrollContent: {
//     paddingHorizontal: 16,
//     paddingBottom: 32,
//     gap: 16,
//   },

//   // ── Profile Banner ──
//   profileBanner: {
//     backgroundColor: color.WHITE,
//     borderRadius: 18,
//     padding: 14,
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1.5,
//     borderColor: color.BORDER_GREEN,
//     gap: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.06,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   profileBannerLeft: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//   },
//   profileWarningIcon: {
//     width: 42,
//     height: 42,
//     borderRadius: 21,
//     backgroundColor: color.GREEN_LIGHT,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   profileBannerTitle: {
//     ...globalStyles.f12Bold,
//     color: color.GREEN_DARK,
//   },
//   profileBannerSub: {
//     ...globalStyles.f10Regular,
//     color: color.TEXT_SUB,
//     marginTop: 2,
//   },
//   profileBannerBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: color.GREEN,
//     paddingHorizontal: 14,
//     paddingVertical: 9,
//     borderRadius: 30,
//   },
//   profileBannerBtnText: {
//     ...globalStyles.f12Bold,
//     color: color.WHITE,
//   },
//   bgDark: {
//     backgroundColor: color.GREEN_DARK,
//     gap: 16,
//     marginHorizontal: -16,
//     paddingHorizontal: 16,
//     paddingTop: 6,
//     paddingBottom: 22,
//     borderBottomLeftRadius: 28,
//     borderBottomRightRadius: 28,
//   },

//   // ── Stats ──
//   statsRow: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   statCard: {
//     flex: 1,
//     backgroundColor: color.WHITE,
//     borderRadius: 18,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: color.BORDER_LIGHT,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.06,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   statCardTitle: {
//     ...globalStyles.f12Regular,
//     color: color.TEXT_SUB,
//     marginBottom: 4,
//   },
//   statCardValue: {
//     ...globalStyles.f20Bold,
//     color: color.GREEN,
//     marginBottom: 4,
//   },
//   statSubRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//   },
//   statSubText: {
//     ...globalStyles.f10Regular,
//     color: color.GREEN,
//   },
//   statGoalText: {
//     ...globalStyles.f16Bold,
//     color: color.TEXT_MAIN,
//     marginBottom: 8,
//   },
//   progressTrack: {
//     flexDirection: 'row',
//     height: 6,
//     borderRadius: 99,
//     backgroundColor: color.SURFACE_CONTAINER,
//     overflow: 'hidden',
//     marginTop: 4,
//   },
//   progressFill: {
//     backgroundColor: color.YELLOW,
//     borderRadius: 99,
//   },

//   // ── Sections ──
//   section: {
//     gap: 12,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   sectionTitle: {
//     ...globalStyles.f14Bold,
//     color: color.TEXT_MAIN,
//   },
//   seeAll: {
//     ...globalStyles.f12Bold,
//     color: color.GREEN,
//   },

//   // ── Quick Actions ──
//   qaRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   qaButton: {
//     alignItems: 'center',
//     gap: 8,
//     flex: 1,
//   },
//   qaIconBox: {
//     width: 56,
//     height: 56,
//     borderRadius: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   qaLabel: {
//     ...globalStyles.f10Regular,
//     color: color.TEXT_SUB,
//     textAlign: 'center',
//   },

//   // ── Booking Card ──
//   bookingCard: {
//     backgroundColor: color.WHITE,
//     borderRadius: 18,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: color.BORDER_LIGHT,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.06,
//     shadowRadius: 8,
//     elevation: 2,
//     gap: 14,
//   },
//   bookingHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   bookingAvatar: {
//     width: 52,
//     height: 52,
//     borderRadius: 12,
//     backgroundColor: color.AVATAR_BG,
//     justifyContent: 'center',
//     alignItems: 'center',
//     overflow: 'hidden',
//   },
//   bookingName: {
//     ...globalStyles.f14Bold,
//     color: color.TEXT_MAIN,
//   },
//   bookingService: {
//     ...globalStyles.f12Regular,
//     color: color.TEXT_SUB,
//     marginTop: 2,
//   },
//   estimateBadge: {
//     backgroundColor: color.YELLOW_BG,
//     borderRadius: 30,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//   },
//   estimateText: {
//     ...globalStyles.f12Bold,
//     color: color.YELLOW_TEXT,
//   },

//   // ── Details Grid ──
//   bookingDetails: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     backgroundColor: color.SURFACE_LOW,
//     borderRadius: 12,
//     padding: 12,
//     gap: 12,
//   },
//   detailItem: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     width: '46%',
//   },
//   detailLabel: {
//     ...globalStyles.f10Regular,
//     color: color.TEXT_MUTED,
//     letterSpacing: 0.4,
//     marginBottom: 2,
//   },
//   detailValue: {
//     ...globalStyles.f12Bold,
//     color: color.TEXT_MAIN,
//   },

//   // ── Actions ──
//   bookingActions: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   rejectBtn: {
//     flex: 1,
//     borderWidth: 2,
//     borderColor: color.RED_REJECT,
//     borderRadius: 12,
//     paddingVertical: 13,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   rejectText: {
//     ...globalStyles.f14Bold,
//     color: color.RED_REJECT,
//   },
//   acceptBtn: {
//     flex: 1,
//     backgroundColor: color.GREEN,
//     borderRadius: 12,
//     paddingVertical: 13,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   acceptText: {
//     ...globalStyles.f14Bold,
//     color: color.WHITE,
//   },

//   // ── Empty State ──
//   emptyState: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 40,
//     gap: 12,
//   },
//   emptyText: {
//     ...globalStyles.f12Regular,
//     color: color.TEXT_MUTED,
//   },
// });

///////////////////////////////////////////////////////////////////////////




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
    image: require("../../assets/images/Banner/Slider-2.png"),
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
    image: require("../../assets/images/Banner/Slider-3.png"),
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
              source={require("../../assets/images/logo/iconpngplain.png")}
              style={styles.logoIcon}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.brand}>KisanSahakar</Text>
              <Text style={styles.brandSub}>Gig Worker App</Text>
            </View>
          </View>
        </View>

        <View style={styles.greetingSection}>
          <Text style={styles.greeting}>Namaste, Aditya soni</Text>
          <Text style={styles.role}>Verified gig worker near Vijayapura</Text>
        </View>
      </LinearGradient>

      <View style={styles.mapCard}>
        <Image
          source={require("../../assets/images/Banner/Slider-4.png")}
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
  profileTab: {
    minHeight: 42,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    gap: 4,
  },
});

export default HomeScreen;
