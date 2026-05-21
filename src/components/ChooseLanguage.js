// import React, { useState } from "react";
// import {
//   View,
//   TouchableOpacity,
//   StatusBar,
//   ImageBackground,
//   ScrollView,
//   StyleSheet,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation, useRoute } from "@react-navigation/native";

// import globalStyles from "../styles/globalStyles";
// import { color } from "../styles/theme";
// import CustomText from "../components/CustomText";
// import SplashScreenBg from "../../assets/images/splashBg.png";
// import { useTranslation } from "../localization/i18n";

// export default function ChooseLanguage() {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { language, setLanguage, t, languageOptions } = useTranslation();
//   const [selectedLanguage, setSelectedLanguage] = useState(language);

//   const handleContinue = () => {
//     setLanguage(selectedLanguage);

//     if (route.params?.returnToProfile) {
//       navigation.goBack();
//       return;
//     }

//     navigation.navigate(route.params?.nextScreen ?? "Login");
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar backgroundColor="transparent" barStyle="dark-content" />

//       <ImageBackground
//         source={SplashScreenBg}
//         resizeMode="cover"
//         style={styles.bg}
//       >
//         <View style={styles.overlay} />

//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.scrollContent}
//         >
//           <View style={styles.header}>
//             <View style={styles.globeIconWrap}>
//               <Ionicons name="globe-outline" size={38} color={color.GREEN} />
//             </View>

//             <CustomText style={styles.title}>{t("language.title")}</CustomText>

//             <CustomText style={styles.subtitle}>
//               {t("language.subtitle")}
//             </CustomText>
//           </View>

//           {languageOptions.map((item) => {
//             const isSelected = selectedLanguage === item.code;

//             return (
//               <TouchableOpacity
//                 key={item.code}
//                 activeOpacity={0.85}
//                 onPress={() => setSelectedLanguage(item.code)}
//                 style={[
//                   styles.languageCard,
//                   isSelected && styles.languageCardSelected,
//                 ]}
//               >
//                 <View
//                   style={[
//                     styles.radioOuter,
//                     isSelected && styles.radioOuterSelected,
//                   ]}
//                 >
//                   {isSelected && <View style={styles.radioInner} />}
//                 </View>

//                 <View style={{ flex: 1 }}>
//                   <CustomText style={styles.languageTitle}>
//                     {item.nativeTitle} ({t(item.titleKey)})
//                   </CustomText>

//                   <CustomText style={styles.languageSubtitle}>
//                     {item.subtitle}
//                   </CustomText>
//                 </View>

//                 <View style={styles.languageBadge}>
//                   <CustomText style={styles.languageBadgeText}>
//                     {item.short}
//                   </CustomText>
//                 </View>
//               </TouchableOpacity>
//             );
//           })}

//           <View style={{ flex: 1 }} />

//           <View style={styles.footer}>
//             <TouchableOpacity
//               activeOpacity={0.9}
//               onPress={handleContinue}
//               style={styles.continueButton}
//             >
//               <CustomText style={styles.continueText}>
//                 {t("common.continue")}
//               </CustomText>

//               <View style={styles.continueArrowWrap}>
//                 <Ionicons name="arrow-forward" size={34} color={color.WHITE} />
//               </View>
//             </TouchableOpacity>

//             <View style={styles.secureRow}>
//               <Ionicons
//                 name="shield-checkmark-outline"
//                 size={26}
//                 color={color.GREEN}
//               />

//               <CustomText style={styles.secureText}>
//                 <CustomText style={styles.secureStrong}>100%</CustomText>{" "}
//                 {t("common.secure")}
//               </CustomText>
//             </View>
//           </View>
//         </ScrollView>
//       </ImageBackground>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//   },
//   bg: {
//     flex: 2,
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(255,255,255,0.82)",
//   },
//   scrollContent: {
//     flexGrow: 1,
//     paddingHorizontal: 22,
//     paddingTop: 20,
//     paddingBottom: 40,
//   },
//   header: {
//     alignItems: "center",
//     marginTop: 30,
//     marginBottom: 30,
//   },
//   globeIconWrap: {
//     width: 76,
//     height: 76,
//     borderRadius: 38,
//     borderWidth: 1.5,
//     borderColor: color.BORDER_GREEN,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 24,
//     backgroundColor: "rgba(46,125,50,0.04)",
//   },
//   title: {
//     ...globalStyles.f24Bold,
//     color: color.TEXT_MAIN,
//     textAlign: "center",
//   },
//   subtitle: {
//     ...globalStyles.f18Regular,
//     color: color.TEXT_MUTED,
//     textAlign: "center",
//     marginTop: 10,
//   },
//   languageCard: {
//     minHeight: 60,
//     borderRadius: 24,
//     backgroundColor: "#ffffffbf",
//     borderWidth: 1,
//     borderColor: "#E2E2E2",
//     marginBottom: 18,
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 18,
//     paddingVertical: 10,
//   },
//   languageCardSelected: {
//     borderColor: color.GREEN,
//     backgroundColor: "rgba(46,125,50,0.04)",
//   },
//   radioOuter: {
//     width: 20,
//     height: 20,
//     borderRadius: 50,
//     borderWidth: 2,
//     borderColor: "#C8C8C8",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 18,
//   },
//   radioOuterSelected: {
//     borderColor: color.GREEN,
//   },
//   radioInner: {
//     width: 18,
//     height: 18,
//     borderRadius: 50,
//     backgroundColor: color.GREEN,
//   },
//   languageTitle: {
//     ...globalStyles.f16Bold,
//     color: color.TEXT_MAIN,
//   },
//   languageSubtitle: {
//     ...globalStyles.f16Regular,
//     color: color.TEXT_MUTED,
//     marginTop: 4,
//   },
//   languageBadge: {
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 10,
//   },
//   languageBadgeText: {
//     ...globalStyles.f20Bold,
//     color: color.GREEN,
//   },
//   footer: {
//     paddingHorizontal: 2,
//     marginTop: 10,
//     paddingBottom: 10,
//   },
//   continueButton: {
//     height: 60,
//     backgroundColor: color.GREEN,
//     borderRadius: 26,
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 6,
//     },
//     shadowOpacity: 0.18,
//     shadowRadius: 10,
//     elevation: 8,
//     position: "relative",
//   },
//   continueText: {
//     ...globalStyles.f20Bold,
//     color: color.WHITE,
//     letterSpacing: 0.3,
//   },
//   continueArrowWrap: {
//     position: "absolute",
//     right: 24,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   secureRow: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 22,
//   },
//   secureText: {
//     ...globalStyles.f16Regular,
//     marginLeft: 8,
//     color: color.TEXT_SUB,
//   },
//   secureStrong: {
//     ...globalStyles.f16Bold,
//     color: color.GREEN,
//   },
// });

/////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from "react-native-svg";

import CustomText from "../components/CustomText";
import { color } from "../styles/theme";
import { useTranslation } from "../localization/i18n";

const { width: W, height: H } = Dimensions.get("window");
const GREEN        = "#2e7d32";
const ORANGE       = "#e07b00";
const LIGHT_GREEN  = "#e8f5e9";
const LIGHT_ORANGE = "#fff3e0";

/* ── Decorative background SVG ──────────────────────────── */
const BgDecor = () => (
  <Svg width={W} height={260} style={{ position: "absolute", top: 0, left: 0 }}>
    <Defs>
      <LinearGradient id="topGrad" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0%"   stopColor={LIGHT_GREEN} stopOpacity="1" />
        <Stop offset="100%" stopColor="#ffffff"      stopOpacity="1" />
      </LinearGradient>
    </Defs>
    {/* Soft green wash */}
    <Path d={`M0,0 L${W},0 L${W},200 Q${W*0.5},260 0,200 Z`} fill="url(#topGrad)" />

    {/* Rings — top right */}
    <Circle cx={W - 30} cy={40}  r={80}  stroke={GREEN}  strokeWidth="1" fill="none" opacity="0.08" />
    <Circle cx={W - 30} cy={40}  r={56}  stroke={GREEN}  strokeWidth="1" fill="none" opacity="0.1"  />
    <Circle cx={W - 30} cy={40}  r={34}  stroke={ORANGE} strokeWidth="1" fill="none" opacity="0.1"  />

    {/* Rings — bottom left */}
    <Circle cx={35}     cy={210} r={55}  stroke={GREEN}  strokeWidth="1" fill="none" opacity="0.07" />
    <Circle cx={35}     cy={210} r={35}  stroke={GREEN}  strokeWidth="1" fill="none" opacity="0.08" />

    {/* Dot grid top-left */}
    {[0,1,2,3].map(i => [0,1,2].map(j => (
      <Circle key={`d${i}${j}`}
        cx={22 + i*18} cy={22 + j*18}
        r={2} fill={GREEN} opacity={0.09 + i*0.01}
      />
    )))}

    {/* Dot grid top-right area */}
    {[0,1,2].map(i => [0,1,2,3].map(j => (
      <Circle key={`e${i}${j}`}
        cx={W*0.72 + i*16} cy={8 + j*16}
        r={1.8} fill={ORANGE} opacity={0.1}
      />
    )))}

    {/* Leaf accent */}
    <Path d={`M${W*0.06},${170} Q${W*0.1},${155} ${W*0.15},${165} Q${W*0.1},${178} ${W*0.06},${170} Z`}
      fill={GREEN} opacity="0.14" />
    <Path d={`M${W*0.87},${80} Q${W*0.92},${70} ${W*0.97},${80} Q${W*0.92},${90} ${W*0.87},${80} Z`}
      fill={ORANGE} opacity="0.18" />
  </Svg>
);

/* ── Language card ───────────────────────────────────────── */
const LangCard = ({ item, isSelected, onPress, index, fadeAnim }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.96, duration: 80, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }),
    ]).start();
    onPress();
  };

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ scale }] }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={handlePress}
        style={[styles.card, isSelected && styles.cardSelected]}
      >
        {/* Left: radio */}
        <View style={[styles.radio, isSelected && styles.radioSelected]}>
          {isSelected && <View style={styles.radioDot} />}
        </View>

        {/* Middle: text */}
        <View style={{ flex: 1 }}>
          <Text style={[styles.cardTitle, isSelected && { color: GREEN }]}>
            {item.nativeTitle}
          </Text>
          <Text style={styles.cardSub}>{item.subtitle}</Text>
        </View>

        {/* Right: short badge */}
        <View style={[styles.badge, isSelected ? styles.badgeSelected : styles.badgeDefault]}>
          <Text style={[styles.badgeText, isSelected && { color: GREEN }]}>
            {item.short}
          </Text>
        </View>

        {/* Selected tick */}
        {isSelected && (
          <View style={styles.tickWrap}>
            <Ionicons name="checkmark-circle" size={20} color={GREEN} />
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

/* ── Main Screen ─────────────────────────────────────────── */
export default function ChooseLanguage() {
  const navigation = useNavigation();
  const route      = useRoute();
  const { language, setLanguage, t, languageOptions } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  // Staggered card fade-in
  const fadeAnims = useRef(
    (languageOptions || []).map(() => new Animated.Value(0))
  ).current;

  // Card slide up
  const cardSlide = useRef(new Animated.Value(50)).current;
  const cardOp    = useRef(new Animated.Value(0)).current;
  // Header fade
  const headerOp  = useRef(new Animated.Value(0)).current;
  const headerY   = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Header
    Animated.parallel([
      Animated.timing(headerOp, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(headerY, { toValue: 0, duration: 600, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();

    // Cards stagger
    Animated.parallel([
      Animated.timing(cardOp,    { toValue: 1, duration: 500, delay: 200, useNativeDriver: true }),
      Animated.timing(cardSlide, { toValue: 0, duration: 500, delay: 200, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();

    Animated.stagger(
      80,
      fadeAnims.map(a =>
        Animated.timing(a, { toValue: 1, duration: 400, easing: Easing.out(Easing.cubic), useNativeDriver: true })
      )
    ).start();
  }, []);

  const handleContinue = () => {
    setLanguage(selectedLanguage);
    if (route.params?.returnToProfile) { navigation.goBack(); return; }
    navigation.navigate(route.params?.nextScreen ?? "Login");
  };

  return (
    <SafeAreaView style={styles.root} edges={["top", "bottom"]}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />

      {/* Background decoration */}
      <BgDecor />

      {/* ── Header row: close + title ── */}
      <Animated.View style={[
        styles.headerRow,
        { opacity: headerOp, transform: [{ translateY: headerY }] },
      ]}>
        {/* Back / Close button */}
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.75}
        >
          <Ionicons name="close" size={20} color="#555" />
        </TouchableOpacity>

        <View style={{ flex: 1 }} />

        {/* Globe badge */}
        <View style={styles.globeBadge}>
          <Ionicons name="globe-outline" size={14} color={GREEN} />
          <Text style={styles.globeBadgeText}>Language</Text>
        </View>
      </Animated.View>

      {/* ── Hero section ── */}
      <Animated.View style={[
        styles.hero,
        { opacity: headerOp, transform: [{ translateY: headerY }] },
      ]}>
        {/* Icon circle */}
        <View style={styles.iconCircle}>
          <View style={styles.iconCircleInner}>
            <Ionicons name="globe-outline" size={36} color={GREEN} />
          </View>
          {/* Orbiting dot */}
          <View style={styles.orbitDot} />
          <View style={[styles.orbitDot, styles.orbitDot2]} />
        </View>

        <Text style={styles.heroTitle}>{t("language.title")}</Text>
        <Text style={styles.heroSub}>{t("language.subtitle")}</Text>

        {/* Language count pill */}
        <View style={styles.countPill}>
          <Ionicons name="layers-outline" size={12} color={ORANGE} />
          <Text style={styles.countText}>
            {languageOptions?.length || 0} languages available
          </Text>
        </View>
      </Animated.View>

      {/* ── Language list ── */}
      <Animated.View style={[
        styles.listWrapper,
        { opacity: cardOp, transform: [{ translateY: cardSlide }] },
      ]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        >
          <Text style={styles.sectionLabel}>{t("language.subtitle")}</Text>

          {(languageOptions || []).map((item, index) => (
            <LangCard
              key={item.code}
              item={item}
              index={index}
              isSelected={selectedLanguage === item.code}
              onPress={() => setSelectedLanguage(item.code)}
              fadeAnim={fadeAnims[index] || new Animated.Value(1)}
            />
          ))}

          <View style={{ height: 16 }} />
        </ScrollView>
      </Animated.View>

      {/* ── Footer: Continue button ── */}
      <Animated.View style={[styles.footer, { opacity: cardOp }]}>
        {/* Selected language info */}
        <View style={styles.selectedInfo}>
          <View style={styles.selectedDot} />
          <Text style={styles.selectedInfoText}>
            Selected:{" "}
            <Text style={{ color: GREEN, fontWeight: "700" }}>
              {languageOptions?.find(l => l.code === selectedLanguage)?.nativeTitle || "—"}
            </Text>
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleContinue}
          style={styles.continueBtn}
        >
          <Text style={styles.continueText}>{t("common.continue")}</Text>
          <View style={styles.continueArrow}>
            <Ionicons name="arrow-forward" size={18} color={GREEN} />
          </View>
        </TouchableOpacity>

        {/* Secure note */}
        <View style={styles.secureRow}>
          <Ionicons name="shield-checkmark-outline" size={14} color={GREEN} />
          <Text style={styles.secureText}>
            <Text style={{ color: GREEN, fontWeight: "700" }}>100%</Text>
            {"  "}{t("common.secure")}
          </Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

/* ─── Styles ────────────────────────────────────────────── */
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },

  /* Header row */
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 4,
    zIndex: 10,
  },
  closeBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
  },
  globeBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: LIGHT_GREEN,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 5,
    borderWidth: 1,
    borderColor: `${GREEN}20`,
  },
  globeBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: GREEN,
    letterSpacing: 0.3,
  },

  /* Hero */
  hero: {
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 20,
    zIndex: 5,
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    position: "relative",
  },
  iconCircleInner: {
    width: 78,
    height: 78,
    borderRadius: 24,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: GREEN,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1.5,
    borderColor: `${GREEN}20`,
  },
  orbitDot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: ORANGE,
    borderWidth: 2,
    borderColor: "#fff",
  },
  orbitDot2: {
    top: "auto",
    right: "auto",
    bottom: 6,
    left: 6,
    width: 8,
    height: 8,
    backgroundColor: GREEN,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: 6,
    textAlign: "center",
    letterSpacing: 0.2,
  },
  heroSub: {
    fontSize: 13,
    color: "#999",
    textAlign: "center",
    lineHeight: 19,
    paddingHorizontal: 30,
    marginBottom: 12,
  },
  countPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: LIGHT_ORANGE,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    gap: 5,
    borderWidth: 1,
    borderColor: `${ORANGE}20`,
  },
  countText: {
    fontSize: 11.5,
    fontWeight: "600",
    color: ORANGE,
    letterSpacing: 0.3,
  },

  /* List */
  listWrapper: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#bbb",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    marginBottom: 12,
  },

  /* Language card */
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#ebebeb",
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    gap: 12,
  },
  cardSelected: {
    borderColor: GREEN,
    backgroundColor: "#f1f8f1",
    shadowColor: GREEN,
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#d0d0d0",
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    borderColor: GREEN,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: GREEN,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 2,
  },
  cardSub: {
    fontSize: 12,
    color: "#aaa",
    fontWeight: "400",
  },
  badge: {
    width: 42,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeDefault: {
    backgroundColor: "#f5f5f5",
  },
  badgeSelected: {
    backgroundColor: LIGHT_GREEN,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#aaa",
    letterSpacing: 0.5,
  },
  tickWrap: {
    marginLeft: -4,
  },

  /* Footer */
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
    backgroundColor: "#fff",
  },
  selectedInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 12,
  },
  selectedDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: GREEN,
  },
  selectedInfoText: {
    fontSize: 13,
    color: "#888",
  },
  continueBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GREEN,
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 24,
    shadowColor: GREEN,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.32,
    shadowRadius: 14,
    elevation: 7,
    marginBottom: 14,
    gap: 10,
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  continueArrow: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  secureRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  secureText: {
    fontSize: 12,
    color: "#bbb",
    letterSpacing: 0.2,
  },
});