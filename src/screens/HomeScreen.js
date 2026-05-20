import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  DeviceEventEmitter,
  Easing,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "../localization/i18n";

const worker = {
  name: "Aditya Soni",
  location: "Hyderabad, Telangana",
  nearby: "Vijayapura",
  rating: "4.8",
  completed: "42",
};

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
  {
    id: "JOB-1851",
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
    id: "JOB-1854",
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

// const heroSlides = [
//   {
//     id: "nearby",
//     title: "3 nearby jobs",
//     detail: "Harvest, sorting, and loading requests within 5 km.",
//     icon: "map-marker-radius",
//   },
//   {
//     id: "kyc",
//     title: "KYC verified",
//     detail: "Farmers can trust your Aadhaar, bank, and profile record.",
//     icon: "shield-check",
//   },
//   {
//     id: "offline",
//     title: "Offline punch ready",
//     detail: "Start and end work even when the network is weak.",
//     icon: "cloud-sync",
//   },
// ];

const farmClusters = [
  {
    id: "cluster-1",
    title: "Nearby farm cluster",
    copy: "3 active requests within 5 km",
    image: require("../../assets/images/Banner/Slider-4.png"),
    chips: ["Paddy", "Tomato", "Loading"],
  },
  {
    id: "cluster-2",
    title: "Harvest work nearby",
    copy: "2 cutting jobs open today",
    image: require("../../assets/images/Banner/Slider-2.png"),
    chips: ["Harvest", "Daily pay", "2.4 km"],
  },
  {
    id: "cluster-3",
    title: "FPO packing cluster",
    copy: "Group sorting and packing work",
    image: require("../../assets/images/Banner/Slider-3.png"),
    chips: ["Packing", "Hourly", "FPO"],
  },
];

const farmCarouselItems = [
  ...farmClusters,
  { ...farmClusters[0], id: "cluster-1-loop" },
];


export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { tx } = useTranslation();
  const { width } = useWindowDimensions();
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const tabBarHidden = useRef(false);
  const farmScrollRef = useRef(null);
  const farmSlideIndex = useRef(0);
  const farmAutoX = useRef(new Animated.Value(0)).current;
  const farmUserTouching = useRef(false);
  const [dutyOn, setDutyOn] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showSticky, setShowSticky] = useState(false);
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const farmCardWidth = width - 40;

  useEffect(() => () => {
    DeviceEventEmitter.emit("ks:setTabBarHidden", false);
  }, []);

  useEffect(() => {
    const listenerId = farmAutoX.addListener(({ value }) => {
      farmScrollRef.current?.scrollTo({ x: value, animated: false });
    });

    return () => farmAutoX.removeListener(listenerId);
  }, [farmAutoX]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (farmUserTouching.current || farmSlideIndex.current >= farmClusters.length) {
        return;
      }

      const nextIndex = farmSlideIndex.current + 1;
      Animated.timing(farmAutoX, {
        toValue: nextIndex * (farmCardWidth + 12),
        duration: 950,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (!finished) {
          return;
        }

        if (nextIndex === farmClusters.length) {
          farmSlideIndex.current = 0;
          farmAutoX.setValue(0);
          farmScrollRef.current?.scrollTo({ x: 0, animated: false });
        } else {
          farmSlideIndex.current = nextIndex;
        }
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [farmAutoX, farmCardWidth]);

  const summary = useMemo(
    () => [
      { label: tx("Confirmed"), value: "Rs 12,480", icon: "checkmark-circle" },
      { label: tx("Pending"), value: "Rs 1,970", icon: "time" },
      { label: tx("Withdrawn"), value: "Rs 8,200", icon: "card" },
    ],
    [tx]
  );

  const stickyOpacity = scrollY.interpolate({
    inputRange: [120, 190],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const stickyTranslate = scrollY.interpolate({
    inputRange: [120, 190],
    outputRange: [-18, 0],
    extrapolate: "clamp",
  });

  const heroTranslate = scrollY.interpolate({
    inputRange: [0, 180],
    outputRange: [0, -26],
    extrapolate: "clamp",
  });

  function RunningJobCard({ job, navigation, tx }) {
  const { width } = useWindowDimensions();
  const cardWidth = width * 0.78; // 78% of screen width

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.runningCard, { width: cardWidth }]}
      onPress={() => navigation.navigate("JobDetails", { job })}
    >
      <View style={styles.runningImageWrapper}>
        <Image source={job.image} style={styles.runningImage} resizeMode="cover" />
        <View style={styles.runningStatusTag}>
          <Text style={styles.runningStatusText}>{tx("ONGOING")}</Text>
        </View>
      </View>
      
      <View style={styles.runningBody}>
        <Text style={styles.runningType} numberOfLines={1}>{tx(job.type)}</Text>
        <Text style={styles.runningMeta} numberOfLines={1}>{tx(job.crop)} • {tx(job.village)}</Text>
        
        <View style={styles.runningFooter}>
          <Text style={styles.runningPay}>{job.pay}</Text>
          <View style={styles.trackBtn}>
            <Ionicons name="navigate-circle" size={18} color="#15803D" />
            <Text style={styles.trackText}>{tx("Track")}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#0B3B21" />

      <Animated.View
        pointerEvents={showSticky ? "auto" : "none"}
        style={[
          styles.stickyHeader,
          {
            paddingTop: insets.top + 8,
            opacity: stickyOpacity,
            transform: [{ translateY: stickyTranslate }],
          },
        ]}
      >
        <LinearGradient
          colors={["#0B3B21", "#13753A"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.stickyCard}
        >
          <View style={styles.stickyLeft}>
            <Image
              source={require("../../assets/images/logo/iconpngplain.png")}
              style={styles.stickyLogo}
              resizeMode="contain"
            />
            <View style={styles.stickyCopy}>
              {/* <Text style={styles.stickyEyebrow}>
                {dutyOn ? "Ready for nearby work" : "Taking a break"}
              </Text> */}
              <Text style={styles.stickyTitle} numberOfLines={1}>
                Hi, {worker.name.split(" ")[0]} - {worker.location}
              </Text>
              <View style={styles.stickyMetaRow}>
                <View style={styles.stickyMiniPill}>
                  <Ionicons name="briefcase" size={11} color="#DCFCE7" />
                  <Text style={styles.stickyMiniText}>{tx("3 live jobs")}</Text>
                </View>
                <View style={styles.stickyMiniPill}>
                  <Ionicons name="star" size={11} color="#FCD34D" />
                  <Text style={styles.stickyMiniText}>{worker.rating}</Text>
                </View>
              </View>
            </View>
          </View>
          <DutySwitch dutyOn={dutyOn} onPress={() => setDutyOn((value) => !value)} compact tx={tx} />
        </LinearGradient>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: bottomNavHidden ? insets.bottom + 22 : insets.bottom + 110 },
        ]}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
            listener: (event) => {
              const nextY = event.nativeEvent.contentOffset.y;
              const delta = nextY - lastScrollY.current;
              const nextShowSticky = nextY > 150;

              setShowSticky((current) => (
                current === nextShowSticky ? current : nextShowSticky
              ));

              if (nextY < 80 || delta < -8) {
                if (tabBarHidden.current) {
                  tabBarHidden.current = false;
                  setBottomNavHidden(false);
                  DeviceEventEmitter.emit("ks:setTabBarHidden", false);
                }
              } else if (nextY > 220 && delta > 8) {
                if (!tabBarHidden.current) {
                  tabBarHidden.current = true;
                  setBottomNavHidden(true);
                  DeviceEventEmitter.emit("ks:setTabBarHidden", true);
                }
              }

              lastScrollY.current = nextY;
            },
          }
        )}
      >
        <Animated.View style={{ transform: [{ translateY: heroTranslate }] }}>
          <LinearGradient
            colors={["#082F1B", "#116834", "#2F8C44"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.hero, { paddingTop: insets.top + 14 }]}
          >
            <View style={styles.topBar}>
              <View style={styles.heroIdentity}>
                <Image
                  source={require("../../assets/images/logo/iconpngplain.png")}
                  style={styles.logoIcon}
                  resizeMode="contain"
                />
                <View style={styles.brandCopy}>
                  <Text style={styles.brand}>Kisan Sahakar</Text>
                  <Text style={styles.brandSub}>{tx("Gig Worker App")}</Text>
                </View>
              </View>

              <View style={styles.topActions}>
                <Pressable style={styles.bellButton}>
                  <Ionicons name="notifications" size={20} color="#FFFFFF" />
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>2</Text>
                  </View>
                </Pressable>
                <DutySwitch dutyOn={dutyOn} onPress={() => setDutyOn((value) => !value)} tx={tx} />
              </View>
            </View>

            <Pressable style={styles.locationPill}>
              <Ionicons name="location-sharp" size={13} color="#FBBF24" />
              <Text style={styles.locationText} numberOfLines={1}>
                {tx("Near {{location}}", { location: worker.location })}
              </Text>
              <Ionicons name="chevron-down" size={12} color="rgba(255,255,255,0.66)" />
            </Pressable>

            {/* <View style={styles.greetingCard}>
              <View style={styles.greetingTopRow}>
                <View style={styles.greetingCopy}>
                  <Text style={styles.greeting}>{worker.name}</Text>
                  <Text style={styles.role}>Verified gig worker near {worker.nearby}</Text>
                </View>

                <View style={[styles.dutyBadge, dutyOn ? styles.dutyBadgeOnline : styles.dutyBadgeOffline]}>
                  <View style={[styles.dutyBadgeDot, dutyOn && styles.dutyBadgeDotOnline]} />
                  <Text style={styles.dutyBadgeText}>{dutyOn ? "Online" : "Offline"}</Text>
                </View>
              </View>

              <View style={styles.heroStatsRow}>
                <HeroMetric label="Rating" value={worker.rating} icon="star" />
                <HeroMetric label="Jobs" value={worker.completed} icon="briefcase" />
                <HeroMetric label="Nearby" value="3" icon="flash" />
              </View>
            </View> */}

            <View style={styles.dots}>
            </View>
          </LinearGradient>
        </Animated.View>

        <View style={styles.contentLift}>
          <ScrollView
            ref={farmScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            disableIntervalMomentum
            snapToInterval={farmCardWidth + 12}
            snapToAlignment="start"
            style={styles.farmScroller}
            contentContainerStyle={styles.farmScrollerContent}
            onScrollBeginDrag={() => {
              farmUserTouching.current = true;
              farmAutoX.stopAnimation();
            }}
            onMomentumScrollEnd={(event) => {
              const nextIndex = Math.round(
                event.nativeEvent.contentOffset.x / (farmCardWidth + 12)
              );
              if (nextIndex >= farmClusters.length) {
                farmSlideIndex.current = 0;
                farmAutoX.setValue(0);
                farmScrollRef.current?.scrollTo({ x: 0, animated: false });
              } else {
                farmSlideIndex.current = Math.max(0, nextIndex);
                farmAutoX.setValue(farmSlideIndex.current * (farmCardWidth + 12));
              }
              farmUserTouching.current = false;
            }}
            onScrollEndDrag={(event) => {
              if (!event.nativeEvent.velocity?.x) {
                farmUserTouching.current = false;
              }
            }}
          >
            {farmCarouselItems.map((cluster) => (
              <View key={cluster.id} style={[styles.farmCard, { width: farmCardWidth }]}>
                <Image
                  source={cluster.image}
                  style={styles.farmImage}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={["rgba(0,0,0,0.08)", "rgba(7,45,25,0.74)"]}
                  style={styles.farmOverlay}
                >
                  <Text style={styles.farmTitle}>{tx(cluster.title)}</Text>
                  <Text style={styles.farmCopy}>{tx(cluster.copy)}</Text>
                  <View style={styles.farmChips}>
                    {cluster.chips.map((chip) => (
                      <Text key={chip} style={styles.farmChip}>{tx(chip)}</Text>
                    ))}
                  </View>
                </LinearGradient>
              </View>
            ))}
          </ScrollView>

          <View style={styles.summaryGrid}>
            {summary.map((item) => (
              <View key={item.label} style={styles.summaryCard}>
                <Ionicons name={item.icon} size={17} color="#15803D" />
                <Text style={styles.summaryValue}>{item.value}</Text>
                <Text style={styles.summaryLabel}>{item.label}</Text>
              </View>
            ))}
          </View>

          {/* Running Bookings Section */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>{tx("Running Bookings")}</Text>
              <Text style={styles.sectionSubtitle}>{tx("Manage your active bookings")}</Text>
            </View>
            <View style={styles.runningLivePill}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>{tx("Active")}</Text>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={width * 0.78 + 12} // Card width + gap
            decelerationRate="fast"
            contentContainerStyle={styles.runningScrollerContent}
          >
            {jobs.map((job) => (
              <RunningJobCard key={job.id} job={job} navigation={navigation} tx={tx} />
            ))}
          </ScrollView>


          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>{tx("Nearby job alerts")}</Text>
              <Text style={styles.sectionSubtitle}>{tx("Accept quickly before the slot closes")}</Text>
            </View>
            <View style={styles.livePill}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>{tx("Live")}</Text>
            </View>
          </View>

          {jobs.map((job) => (
            <JobCard key={job.id} job={job} navigation={navigation} tx={tx} />
          ))}
         
        </View>
      </Animated.ScrollView>
    </View>
  );
}

function DutySwitch({ dutyOn, onPress, compact = false, tx = (text) => text }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="switch"
      accessibilityState={{ checked: dutyOn }}
      style={[styles.dutyWrap, compact && styles.dutyWrapCompact]}
    >
      {!compact && (
        <Text style={[styles.dutyText, dutyOn && styles.dutyTextActive]}>
          {dutyOn ? tx("ONLINE") : tx("OFFLINE")}
        </Text>
      )}
      <View style={[styles.switchTrack, dutyOn && styles.switchTrackActive]}>
        <View style={[styles.switchThumb, dutyOn && styles.switchThumbActive]}>
          <View style={[styles.switchDot, dutyOn && styles.switchDotActive]} />
        </View>
      </View>
    </Pressable>
  );
}

function HeroMetric({ label, value, icon }) {
  return (
    <View style={styles.heroMetric}>
      <Ionicons name={icon} size={14} color="#FCD34D" />
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

function JobCard({ job, navigation, tx }) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.jobCard}
      onPress={() => navigation.navigate("JobDetails", { job })}
    >
      <Image source={job.image} style={styles.jobImage} resizeMode="cover" />
      <View style={styles.jobBody}>
        <View style={styles.jobHeader}>
          <View style={styles.jobTitleWrap}>
            <Text style={styles.jobType}>{tx(job.type)}</Text>
            <Text style={styles.jobMeta}>{tx(job.crop)} - {tx(job.village)} - {tx(job.distance)}</Text>
          </View>
          <Text style={styles.jobPay}>{job.pay}</Text>
        </View>

        <View style={styles.jobInfoRow}>
          <InfoPill icon="time-outline" label={tx(job.time)} />
          <InfoPill icon="people-outline" label={tx(job.workers)} />
        </View>

        <View style={styles.jobFooter}>
          <View style={styles.ratingPill}>
            <Ionicons name="star" size={13} color="#F59E0B" />
            <Text style={styles.rating}>{tx("Farmer {{rating}}", { rating: job.rating })}</Text>
          </View>
          <Text style={styles.viewDetails}>{tx("View details")}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function InfoPill({ icon, label }) {
  return (
    <View style={styles.infoPill}>
      <Ionicons name={icon} size={14} color="#356246" />
      <Text style={styles.infoText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F4FAF2",
  },
  stickyHeader: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    zIndex: 20,
    paddingHorizontal: 14,
    paddingBottom: 8,
    // backgroundColor: "rgba(244,250,242,0.9)",
  },
  stickyCard: {
    minHeight: 70,
    borderRadius: 22,
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#08341E",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 8,
  },
  stickyLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  stickyLogo: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.13)",
  },
  stickyCopy: {
    flex: 1,
  },
  stickyEyebrow: {
    color: "#BBF7D0",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  stickyTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
    marginTop: 2,
  },
  stickyMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 6,
  },
  stickyMiniPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.13)",
  },
  stickyMiniText: {
    color: "#ECFDF5",
    fontSize: 10,
    fontWeight: "900",
  },
  scrollContent: {
    backgroundColor: "#F4FAF2",
  },
  hero: {
    paddingHorizontal: 20,
    paddingBottom: 38,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: "hidden",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  locationPill: {
    alignSelf: "flex-start",
    maxWidth: "100%",
    minHeight: 30,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 14,
  },
  locationText: {
    flex: 1,
    color: "#DDFBE5",
    fontSize: 11,
    fontWeight: "800",
  },
  topActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  bellButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },
  badge: {
    position: "absolute",
    top: 4,
    right: 5,
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#0B3B21",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
  },
  dutyWrap: {
    alignItems: "center",
    gap: 4,
  },
  dutyWrapCompact: {
    paddingLeft: 10,
  },
  dutyText: {
    color: "rgba(255,255,255,0.56)",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
  },
  dutyTextActive: {
    color: "#FBBF24",
  },
  switchTrack: {
    width: 46,
    height: 22,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.24)",
    justifyContent: "center",
    padding: 3,
  },
  switchTrackActive: {
    backgroundColor: "#F59E0B",
  },
  switchThumb: {
    width: 18,
    height: 18,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  switchThumbActive: {
    transform: [{ translateX: 22 }],
  },
  switchDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#94A3B8",
  },
  switchDotActive: {
    backgroundColor: "#F59E0B",
  },
  heroIdentity: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  logoIcon: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  brandCopy: {
    flex: 1,
  },
  brand: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
  },
  brandSub: {
    color: "#D7F5DE",
    fontSize: 12,
    fontWeight: "800",
    marginTop: 2,
  },
  greetingCard: {
    marginTop: 16,
    padding: 15,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.13)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
  },
  greetingTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  greetingCopy: {
    flex: 1,
  },
  greetingEyebrow: {
    color: "#BBF7D0",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  greeting: {
    color: "#FFFFFF",
    fontSize: 25,
    lineHeight: 31,
    fontWeight: "900",
    marginTop: 4,
  },
  role: {
    color: "#D7F5DE",
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "800",
    marginTop: 6,
  },
  dutyBadge: {
    minHeight: 30,
    paddingHorizontal: 10,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  dutyBadgeOnline: {
    backgroundColor: "rgba(251,191,36,0.18)",
  },
  dutyBadgeOffline: {
    backgroundColor: "rgba(148,163,184,0.18)",
  },
  dutyBadgeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#94A3B8",
  },
  dutyBadgeDotOnline: {
    backgroundColor: "#FBBF24",
  },
  dutyBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "900",
  },
  heroStatsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 14,
  },
  heroMetric: {
    flex: 1,
    minHeight: 48,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.13)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
  },
  metricValue: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },
  metricLabel: {
    color: "#DCFCE7",
    fontSize: 11,
    fontWeight: "800",
  },
  slideScroller: {
    marginTop: 18,
    marginHorizontal: -20,
  },
  heroSlide: {
    width: 320,
    minHeight: 86,
    marginLeft: 20,
    marginRight: 2,
    borderRadius: 20,
    padding: 14,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  slideIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  slideCopy: {
    flex: 1,
  },
  slideTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },
  slideDetail: {
    color: "#DFFBE7",
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "700",
    marginTop: 4,
  },
  dots: {
    flexDirection: "row",
    alignSelf: "center",
    gap: 6,
    marginTop: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.35)",
  },
  dotActive: {
    width: 20,
    backgroundColor: "#FFFFFF",
  },
  contentLift: {
    marginTop: -28,
  },
  farmScroller: {
    marginTop: 0,
  },
  farmScrollerContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  farmCard: {
    height: 168,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#DDEFE2",
    borderWidth: 1,
    borderColor: "#DCEBDD",
  },
  farmImage: {
    width: "100%",
    height: "100%",
  },
  farmOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    padding: 16,
  },
  farmTitle: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "900",
  },
  farmCopy: {
    color: "#E9FBEF",
    fontSize: 13,
    marginTop: 4,
    fontWeight: "800",
  },
  farmChips: {
    flexDirection: "row",
    gap: 7,
    marginTop: 10,
  },
  farmChip: {
    color: "#12351F",
    fontSize: 11,
    fontWeight: "900",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.86)",
  },
  quickRow: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 18,
    gap: 10,
  },
  quickButton: {
    flex: 1,
    minHeight: 82,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCEBDD",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  quickIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  quickLabel: {
    color: "#12351F",
    fontSize: 11,
    fontWeight: "900",
    marginTop: 8,
    textAlign: "center",
  },
  summaryGrid: {
    flexDirection: "row",
    gap: 10,
    marginHorizontal: 20,
    marginTop: 16,
  },
  summaryCard: {
    flex: 1,
    minHeight: 96,
    padding: 12,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCEBDD",
    justifyContent: "center",
  },
  summaryValue: {
    color: "#102A18",
    fontSize: 15,
    fontWeight: "900",
    marginTop: 8,
  },
  summaryLabel: {
    color: "#647A69",
    fontSize: 11,
    marginTop: 4,
    fontWeight: "800",
  },
  sectionHeader: {
    marginHorizontal: 20,
    marginTop: 26,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  sectionTitle: {
    color: "#12351F",
    fontSize: 20,
    fontWeight: "900",
  },
  sectionSubtitle: {
    color: "#647A69",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 3,
  },
  livePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "#E9FBEF",
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#16A34A",
  },
  liveText: {
    color: "#15803D",
    fontSize: 12,
    fontWeight: "900",
  },
  jobCard: {
    marginHorizontal: 20,
    marginBottom: 14,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#DCEBDD",
  },
  jobImage: {
    width: "100%",
    height: 126,
  },
  jobBody: {
    padding: 15,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  jobTitleWrap: {
    flex: 1,
  },
  jobType: {
    color: "#12351F",
    fontSize: 17,
    fontWeight: "900",
  },
  jobPay: {
    color: "#15803D",
    fontSize: 15,
    fontWeight: "900",
  },
  jobMeta: {
    color: "#647A69",
    fontSize: 13,
    marginTop: 6,
    fontWeight: "700",
  },
  jobInfoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 13,
  },
  infoPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "#F1F7F0",
  },
  infoText: {
    color: "#356246",
    fontSize: 11,
    fontWeight: "800",
  },
  jobFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
  },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  rating: {
    color: "#4D6656",
    fontSize: 12,
    fontWeight: "800",
  },
  viewDetails: {
    color: "#15803D",
    fontSize: 12,
    fontWeight: "900",
  },
  // --- Running Bookings Horizontal Styles ---
  runningScrollerContent: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    gap: 12,
  },
  runningCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#DCEBDD",
    // Shadow for depth
    shadowColor: "#08341E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  runningImageWrapper: {
    height: 100, // Compact height for horizontal card
    width: "100%",
  },
  runningImage: {
    width: "100%",
    height: "100%",
  },
  runningStatusTag: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#15803D",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  runningStatusText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
  },
  runningBody: {
    padding: 12,
  },
  runningType: {
    color: "#12351F",
    fontSize: 15,
    fontWeight: "900",
  },
  runningMeta: {
    color: "#647A69",
    fontSize: 12,
    marginTop: 2,
    fontWeight: "700",
  },
  runningFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#F1F7F0",
  },
  runningPay: {
    color: "#15803D",
    fontSize: 13,
    fontWeight: "900",
  },
  trackBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  trackText: {
    color: "#15803D",
    fontSize: 12,
    fontWeight: "900",
  },
  runningLivePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "#F0FDFA", // Slightly different color for "Active"
  },
});
