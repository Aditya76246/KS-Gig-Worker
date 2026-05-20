// import React, { useState } from 'react';
// import {
//   View,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Animated, { FadeInDown } from 'react-native-reanimated';

// import CustomText from '../components/CustomText';
// import globalStyles from '../styles/globalStyles';
// import { color } from '../styles/theme';
// import useHideTabBarOnScroll from '../hooks/useHideTabBarOnScroll';
// import { useTranslation } from '../localization/i18n';

// // ─── Profile completion steps ─────────────────────────────────────────────────
// const COMPLETION_STEPS = [
//   { id: 'basic', labelKey: 'profile.steps.basic', icon: 'person-outline', status: 'done' },
//   { id: 'farm', labelKey: 'profile.steps.driving', icon: 'leaf-outline', status: 'done' },
//   { id: 'bank', labelKey: 'profile.steps.bank', icon: 'business-outline', status: 'partial', progress: '0/2' },
// ];

// // ─── Menu sections ────────────────────────────────────────────────────────────
// const ACCOUNT_MENU = [
//   { id: 'PersonalInfo', labelKey: 'profile.menu.personalInfo', subKey: 'profile.menu.personalInfoSub', icon: 'person-outline' },
//   { id: 'Documents', labelKey: 'profile.menu.documents', subKey: 'profile.menu.documentsSub', icon: 'document-text-outline' },
//   { id: 'ChooseLanguage', labelKey: 'profile.menu.language', subKey: 'profile.menu.languageSub', icon: 'globe-outline' },
// ];

// const SUPPORT_MENU = [
//   { id: 'help', labelKey: 'profile.menu.help', subKey: 'profile.menu.helpSub', icon: 'headset-outline' },
//   { id: 'about', labelKey: 'profile.menu.about', subKey: 'profile.menu.aboutSub', icon: 'information-circle-outline' },
//   { id: 'terms', labelKey: 'profile.menu.terms', subKey: 'profile.menu.termsSub', icon: 'reader-outline' },
//   { id: 'privacy', labelKey: 'profile.menu.privacy', subKey: 'profile.menu.privacySub', icon: 'lock-closed-outline' },
// ];

// // ─── Sub-components ───────────────────────────────────────────────────────────

// function CompletionStep({ step }) {
//   const isDone = step.status === 'done';
//   const isPartial = step.status === 'partial';

//   return (
//     <View style={styles.stepItem}>
//       <View style={[styles.stepIconBox, isDone ? styles.stepIconDone : styles.stepIconPending]}>
//         <Ionicons name={step.icon} size={20} color={isDone ? color.GREEN : color.TEXT_MUTED} />
//       </View>
//       <CustomText style={styles.stepLabel}>{step.label}</CustomText>
//       {isDone ? (
//         <Ionicons name="checkmark-circle" size={18} color={color.GREEN} style={styles.stepBadge} />
//       ) : (
//         <CustomText style={styles.stepProgress}>{step.progress}</CustomText>
//       )}
//     </View>
//   );
// }

// function MenuItem({ item, onPress, isLast }) {
//   return (
//     <TouchableOpacity
//       style={[styles.menuItem, !isLast && styles.menuItemBorder]}
//       onPress={() => onPress(item.id)}
//       activeOpacity={0.7}
//     >
//       <View style={styles.menuIconBox}>
//         <Ionicons name={item.icon} size={20} color={color.GREEN} />
//       </View>
//       <View style={styles.menuText}>
//         <CustomText style={styles.menuLabel}>{item.label}</CustomText>
//         <CustomText style={styles.menuSub}>{item.sub}</CustomText>
//       </View>
//       <Ionicons name="chevron-forward" size={18} color={color.TEXT_MUTED} />
//     </TouchableOpacity>
//   );
// }

// // ─── Main Screen ──────────────────────────────────────────────────────────────

// export default function ProfileScreen({ navigation }) {
//   const insets = useSafeAreaInsets();
//   const { bottomNavHidden, handleScroll } = useHideTabBarOnScroll();
//   const { t } = useTranslation();
//   const completionPct = 66;

//   const completionSteps = COMPLETION_STEPS.map((step) => ({
//     ...step,
//     label: t(step.labelKey),
//   }));

//   const accountMenu = ACCOUNT_MENU.map((item) => ({
//     ...item,
//     label: t(item.labelKey),
//     sub: t(item.subKey),
//   }));

//   const supportMenu = SUPPORT_MENU.map((item) => ({
//     ...item,
//     label: t(item.labelKey),
//     sub: t(item.subKey),
//   }));

//   const handleMenuPress = (id) => {
//     if (id === 'ChooseLanguage') {
//       navigation.navigate(id, { returnToProfile: true });
//       return;
//     }

//     navigation.navigate(id);
//   };

//   const handleLogout = () => {
//     navigation.getParent()?.getParent()?.reset({
//       index: 0,
//       routes: [{ name: 'Auth' }],
//     });
//   };

//   return (
//     <View style={styles.root}>

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={[
//           styles.scrollContent,
//           { paddingBottom: bottomNavHidden ? insets.bottom + 22 : insets.bottom + 110 },
//         ]}
//         scrollEventThrottle={16}
//         onScroll={handleScroll}
//       >

//         {/* ── Profile Card ── */}
//         <Animated.View entering={FadeInDown.delay(50).duration(400)} style={styles.profileCard}>
//           <View style={styles.profileCardInner}>

//             {/* Avatar */}
//             <View style={styles.avatarWrapper}>
//               <View style={styles.avatar}>
//                 <Ionicons name="person" size={44} color="#aaa" />
//               </View>
//               <TouchableOpacity style={styles.cameraBtn} activeOpacity={0.8}>
//                 <Ionicons name="camera" size={14} color={color.WHITE} />
//               </TouchableOpacity>
//             </View>

//             {/* Info */}
//             <View style={styles.profileInfo}>
//               <CustomText style={styles.profileName}>Ramesh Patil</CustomText>

//               <View style={styles.roleBadge}>
//                 <MaterialCommunityIcons name="calendar-month-outline" size={13} color={color.GREEN} />
//                 <CustomText style={styles.roleText}>{t('profile.role')}</CustomText>
//               </View>

//               <View style={styles.contactRow}>
//                 <Ionicons name="call-outline" size={14} color={color.TEXT_SUB} />
//                 <CustomText style={styles.contactText}>+91 98765 43210</CustomText>
//               </View>
//               <View style={styles.contactRow}>
//                 <Ionicons name="mail-outline" size={14} color={color.TEXT_SUB} />
//                 <CustomText style={styles.contactText}>rameshpatil@gmail.com</CustomText>
//               </View>
//             </View>

//             {/* Edit arrow */}
//             <TouchableOpacity style={styles.editArrow} onPress={() => handleMenuPress('PersonalInfo')}>
//               <Ionicons name="chevron-forward" size={20} color={color.TEXT_MUTED} />
//             </TouchableOpacity>
//           </View>
//         </Animated.View>

//         {/* ── Profile Completion Card ── */}
//         <Animated.View entering={FadeInDown.delay(120).duration(400)} style={styles.completionCard}>
//           <View style={styles.completionHeader}>
//             <View style={{ flex: 1 }}>
//               <CustomText style={styles.completionTitle}>{t('profile.profileCompletion')}</CustomText>
//               <CustomText style={styles.completionSub}>{t('profile.completionSubtitle')}</CustomText>
//             </View>
//             <TouchableOpacity style={styles.completeNowBtn} onPress={() => handleMenuPress('PersonalInfo')} activeOpacity={0.85}>
//               <CustomText style={styles.completeNowText}>{t('profile.completeNow')}</CustomText>
//             </TouchableOpacity>
//           </View>

//           {/* Progress Bar */}
//           <View style={styles.progressTrack}>
//             <View style={[styles.progressFill, { width: `${completionPct}%` }]} />
//           </View>
//           <CustomText style={styles.progressLabel}>{t('profile.completePercent', { percent: completionPct })}</CustomText>

//           {/* Steps */}
//           <View style={styles.stepsRow}>
//             {completionSteps.map((step) => (
//               <CompletionStep key={step.id} step={step} />
//             ))}
//           </View>
//         </Animated.View>

//         {/* ── Account & Settings ── */}
//         <Animated.View entering={FadeInDown.delay(190).duration(400)}>
//           <CustomText style={styles.sectionTitle}>{t('profile.accountSettings')}</CustomText>
//           <View style={styles.menuCard}>
//             {accountMenu.map((item, i) => (
//               <MenuItem
//                 key={item.id}
//                 item={item}
//                 onPress={handleMenuPress}
//                 isLast={i === ACCOUNT_MENU.length - 1}
//               />
//             ))}
//           </View>
//         </Animated.View>

//         {/* ── Support & About ── */}
//         <Animated.View entering={FadeInDown.delay(250).duration(400)}>
//           <CustomText style={styles.sectionTitle}>{t('profile.supportAbout')}</CustomText>
//           <View style={styles.menuCard}>
//             {supportMenu.map((item, i) => (
//               <MenuItem
//                 key={item.id}
//                 item={item}
//                 onPress={handleMenuPress}
//                 isLast={i === SUPPORT_MENU.length - 1}
//               />
//             ))}
//           </View>
//         </Animated.View>

//         {/* ── Logout ── */}
//         <Animated.View entering={FadeInDown.delay(300).duration(400)}>
//           <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
//             <Ionicons name="log-out-outline" size={20} color={color.RED_REJECT} />
//             <CustomText style={styles.logoutText}>{t('profile.logout')}</CustomText>
//           </TouchableOpacity>
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
//   scrollContent: {
//     paddingHorizontal: 16,
//     paddingTop: 12,
//     paddingBottom: 40,
//     gap: 16,
//   },

//   // ── Profile Card ──
//   profileCard: {
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
//   profileCardInner: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     gap: 14,
//   },
//   avatarWrapper: {
//     position: 'relative',
//   },
//   avatar: {
//     width: 76,
//     height: 76,
//     borderRadius: 38,
//     backgroundColor: color.AVATAR_BG,
//     justifyContent: 'center',
//     alignItems: 'center',
//     overflow: 'hidden',
//   },
//   cameraBtn: {
//     position: 'absolute',
//     bottom: 0,
//     right: 0,
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     backgroundColor: color.GREEN,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: color.WHITE,
//   },
//   profileInfo: {
//     flex: 1,
//     gap: 5,
//   },
//   profileName: {
//     ...globalStyles.f16Bold,
//     color: color.TEXT_MAIN,
//   },
//   roleBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 5,
//     backgroundColor: color.GREEN_BG,
//     alignSelf: 'flex-start',
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 30,
//   },
//   roleText: {
//     ...globalStyles.f10Regular,
//     color: color.GREEN,
//   },
//   contactRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 6,
//   },
//   contactText: {
//     ...globalStyles.f12Regular,
//     color: color.TEXT_SUB,
//   },
//   editArrow: {
//     paddingTop: 2,
//   },

//   // ── Completion Card ──
//   completionCard: {
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
//     gap: 12,
//   },
//   completionHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//   },
//   completionTitle: {
//     ...globalStyles.f14Bold,
//     color: color.TEXT_MAIN,
//   },
//   completionSub: {
//     ...globalStyles.f10Regular,
//     color: color.TEXT_MUTED,
//     marginTop: 2,
//   },
//   completeNowBtn: {
//     backgroundColor: color.GREEN,
//     paddingHorizontal: 14,
//     paddingVertical: 10,
//     borderRadius: 12,
//   },
//   completeNowText: {
//     ...globalStyles.f12Bold,
//     color: color.WHITE,
//   },
//   progressTrack: {
//     height: 8,
//     borderRadius: 99,
//     backgroundColor: color.AVATAR_BG,
//     overflow: 'hidden',
//   },
//   progressFill: {
//     height: '100%',
//     backgroundColor: color.GREEN,
//     borderRadius: 99,
//   },
//   progressLabel: {
//     ...globalStyles.f12Bold,
//     color: color.GREEN,
//     textAlign: 'right',
//     marginTop: -6,
//   },
//   stepsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 4,
//   },
//   stepItem: {
//     alignItems: 'center',
//     gap: 6,
//     flex: 1,
//   },
//   stepIconBox: {
//     width: 46,
//     height: 46,
//     borderRadius: 23,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   stepIconDone: {
//     backgroundColor: color.GREEN_BG,
//   },
//   stepIconPending: {
//     backgroundColor: color.SURFACE_LOW,
//   },
//   stepLabel: {
//     ...globalStyles.f10Regular,
//     color: color.TEXT_SUB,
//     textAlign: 'center',
//   },
//   stepBadge: {
//     marginTop: -2,
//   },
//   stepProgress: {
//     ...globalStyles.f10Bold,
//     color: '#e65100',
//   },

//   // ── Section Title ──
//   sectionTitle: {
//     ...globalStyles.f14Bold,
//     color: color.TEXT_MUTED,
//     marginBottom: 8,
//     marginLeft: 2,
//   },

//   // ── Menu Card ──
//   menuCard: {
//     backgroundColor: color.WHITE,
//     borderRadius: 18,
//     borderWidth: 1,
//     borderColor: color.BORDER_LIGHT,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.06,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     gap: 12,
//   },
//   menuItemBorder: {
//     borderBottomWidth: 1,
//     borderBottomColor: color.BORDER_LIGHT,
//   },
//   menuIconBox: {
//     width: 38,
//     height: 38,
//     borderRadius: 10,
//     backgroundColor: color.GREEN_BG,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   menuText: {
//     flex: 1,
//     gap: 2,
//   },
//   menuLabel: {
//     ...globalStyles.f12Bold,
//     color: color.TEXT_MAIN,
//   },
//   menuSub: {
//     ...globalStyles.f10Regular,
//     color: color.TEXT_MUTED,
//   },

//   // ── Logout ──
//   logoutBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 10,
//     backgroundColor: color.WHITE,
//     borderRadius: 18,
//     borderWidth: 1.5,
//     borderColor: color.BORDER_RED,
//     paddingVertical: 16,
//   },
//   logoutText: {
//     ...globalStyles.f14Bold,
//     color: color.RED_REJECT,
//   },
// });

/////////////////////////////////////////////////////

import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';

import CustomText from '../components/CustomText';
import globalStyles from '../styles/globalStyles';
import { color } from '../styles/theme';
import useHideTabBarOnScroll from '../hooks/useHideTabBarOnScroll';
import { useTranslation } from '../localization/i18n';

// ─── Data Constants (Unchanged) ───────────────────────────────────────────────
const COMPLETION_STEPS = [
  { id: 'basic', labelKey: 'profile.steps.basic', icon: 'person-outline', status: 'done' },
  { id: 'farm', labelKey: 'profile.steps.driving', icon: 'leaf-outline', status: 'done' },
  { id: 'bank', labelKey: 'profile.steps.bank', icon: 'business-outline', status: 'partial', progress: '0/2' },
];

const ACCOUNT_MENU = [
  { id: 'PersonalInfo', labelKey: 'profile.menu.personalInfo', subKey: 'profile.menu.personalInfoSub', icon: 'person-outline' },
  { id: 'Documents', labelKey: 'profile.menu.documents', subKey: 'profile.menu.documentsSub', icon: 'document-text-outline' },
  { id: 'ChooseLanguage', labelKey: 'profile.menu.language', subKey: 'profile.menu.languageSub', icon: 'globe-outline' },
];

const SUPPORT_MENU = [
  { id: 'help', labelKey: 'profile.menu.help', subKey: 'profile.menu.helpSub', icon: 'headset-outline' },
  { id: 'about', labelKey: 'profile.menu.about', subKey: 'profile.menu.aboutSub', icon: 'information-circle-outline' },
  { id: 'terms', labelKey: 'profile.menu.terms', subKey: 'profile.menu.termsSub', icon: 'reader-outline' },
  { id: 'privacy', labelKey: 'profile.menu.privacy', subKey: 'profile.menu.privacySub', icon: 'lock-closed-outline' },
];

// ─── Sub-components (Redesigned) ──────────────────────────────────────────────

function CompletionStep({ step }) {
  const isDone = step.status === 'done';
  return (
    <View style={styles.stepItem}>
      <View style={[styles.stepIconBox, isDone ? styles.stepIconDone : styles.stepIconPending]}>
        <Ionicons name={step.icon} size={18} color={isDone ? '#15803D' : '#647A69'} />
      </View>
      <CustomText style={styles.stepLabel}>{step.label}</CustomText>
      {isDone ? (
        <Ionicons name="checkmark-circle" size={14} color="#15803D" />
      ) : (
        <CustomText style={styles.stepProgressText}>{step.progress}</CustomText>
      )}
    </View>
  );
}

function MenuItem({ item, onPress, isLast }) {
  return (
    <TouchableOpacity
      style={[styles.menuItem, !isLast && styles.menuItemBorder]}
      onPress={() => onPress(item.id)}
      activeOpacity={0.6}
    >
      <View style={styles.menuIconContainer}>
        <Ionicons name={item.icon} size={20} color="#15803D" />
      </View>
      <View style={styles.menuTextContainer}>
        <CustomText style={styles.menuLabel}>{item.label}</CustomText>
        <CustomText style={styles.menuSub}>{item.sub}</CustomText>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
    </TouchableOpacity>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function ProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { bottomNavHidden, handleScroll } = useHideTabBarOnScroll();
  const { t } = useTranslation();
  const completionPct = 66;

  // Data Mapping (Unchanged logic)
  const completionSteps = COMPLETION_STEPS.map(s => ({ ...s, label: t(s.labelKey) }));
  const accountMenu = ACCOUNT_MENU.map(i => ({ ...i, label: t(i.labelKey), sub: t(i.subKey) }));
  const supportMenu = SUPPORT_MENU.map(i => ({ ...i, label: t(i.labelKey), sub: t(i.subKey) }));

  const handleMenuPress = (id) => {
    navigation.navigate(id === 'ChooseLanguage' ? id : id, id === 'ChooseLanguage' ? { returnToProfile: true } : undefined);
  };

  const handleLogout = () => {
    navigation.getParent()?.getParent()?.reset({ index: 0, routes: [{ name: 'Auth' }] });
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#082F1B" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: bottomNavHidden ? insets.bottom + 22 : insets.bottom + 110 },
        ]}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* ── Profile Floating Card ── */}
        <Animated.View entering={FadeInDown.delay(50).duration(400)} style={styles.profileFloatingCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarCircle}>
               <Ionicons name="person" size={40} color="#CBD5E1" />
            </View>
            <TouchableOpacity style={styles.cameraPill}>
              <Ionicons name="camera" size={12} color="#FFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.userCoreInfo}>
            <CustomText style={styles.userName}>Ramesh Patil</CustomText>
            <View style={styles.phoneRow}>
              <Ionicons name="call" size={12} color="#15803D" />
              <CustomText style={styles.phoneText}>+91 98765 43210</CustomText>
            </View>
          </View>
          
          <TouchableOpacity style={styles.editIconBtn} onPress={() => handleMenuPress('PersonalInfo')}>
            <Ionicons name="create-outline" size={20} color="#15803D" />
          </TouchableOpacity>
        </Animated.View>

        {/* ── Completion Card (Modernized) ── */}
        <Animated.View entering={FadeInDown.delay(120).duration(400)} style={styles.completionSection}>
          <View style={styles.completionHeader}>
            <View>
              <CustomText style={styles.sectionTitleLite}>{t('profile.profileCompletion')}</CustomText>
              <CustomText style={styles.completionStatusText}>{t('profile.completePercent', { percent: completionPct })}</CustomText>
            </View>
            <TouchableOpacity style={styles.completeBtn} onPress={() => handleMenuPress('PersonalInfo')}>
              <CustomText style={styles.completeBtnText}>{t('profile.completeNow')}</CustomText>
            </TouchableOpacity>
          </View>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${completionPct}%` }]} />
          </View>

          <View style={styles.stepsRow}>
            {completionSteps.map((step) => (
              <CompletionStep key={step.id} step={step} />
            ))}
          </View>
        </Animated.View>

        {/* ── Menu Sections ── */}
        <View style={styles.menuGroup}>
          <CustomText style={styles.menuHeaderTitle}>{t('profile.accountSettings')}</CustomText>
          <View style={styles.menuWrapperCard}>
            {accountMenu.map((item, i) => (
              <MenuItem key={item.id} item={item} onPress={handleMenuPress} isLast={i === accountMenu.length - 1} />
            ))}
          </View>
        </View>

        <View style={styles.menuGroup}>
          <CustomText style={styles.menuHeaderTitle}>{t('profile.supportAbout')}</CustomText>
          <View style={styles.menuWrapperCard}>
            {supportMenu.map((item, i) => (
              <MenuItem key={item.id} item={item} onPress={handleMenuPress} isLast={i === supportMenu.length - 1} />
            ))}
          </View>
        </View>

        {/* ── Logout Button (Themed) ── */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
          <LinearGradient colors={['#FEF2F2', '#FFF1F2']} style={styles.logoutGradient}>
            <Ionicons name="log-out-outline" size={20} color="#E11D48" />
            <CustomText style={styles.logoutText}>{t('profile.logout')}</CustomText>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F4FAF2',
  },
  slimHero: {
    paddingHorizontal: 20,
    paddingBottom: 50,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoSmall: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },
  brandSubTitle: {
    color: '#BBF7D0',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  // Floating Card
  profileFloatingCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 16,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#08341E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E8F5E9',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarCircle: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cameraPill: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#15803D',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  userCoreInfo: {
    flex: 1,
    marginLeft: 15,
  },
  userName: {
    fontSize: 19,
    fontWeight: '900',
    color: '#102A18',
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  phoneText: {
    fontSize: 13,
    color: '#647A69',
    fontWeight: '600',
  },
  editIconBtn: {
    padding: 8,
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
  },
  // Completion Section
  completionSection: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 16,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#E8F5E9',
  },
  completionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  sectionTitleLite: {
    fontSize: 14,
    fontWeight: '800',
    color: '#12351F',
  },
  completionStatusText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#16A34A',
    marginTop: 2,
  },
  completeBtn: {
    backgroundColor: '#15803D',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  completeBtnText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#FFF',
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#F1F5F2',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#16A34A',
  },
  stepsRow: {
    flexDirection: 'row',
    marginTop: 18,
    justifyContent: 'space-between',
  },
  stepItem: {
    alignItems: 'center',
    flex: 1,
  },
  stepIconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  stepIconDone: { backgroundColor: '#F0FDF4' },
  stepIconPending: { backgroundColor: '#F8FAFC' },
  stepLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#647A69',
    textAlign: 'center',
    marginBottom: 2,
  },
  stepProgressText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#F59E0B',
  },
  // Menu Section
  menuGroup: {
    marginTop: 20,
  },
  menuHeaderTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#12351F',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginLeft: 4,
    marginBottom: 10,
  },
  menuWrapperCard: {
    backgroundColor: '#FFF',
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8F5E9',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F2',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: '#102A18',
  },
  menuSub: {
    fontSize: 12,
    color: '#647A69',
    fontWeight: '500',
  },
  // Logout
  logoutButton: {
    marginTop: 25,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  logoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#E11D48',
  },
});