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
import globalStyles from '../../styles/globalStyles';
import { color } from '../../styles/theme';
import useHideTabBarOnScroll from '../hooks/useHideTabBarOnScroll';
import { useTranslation } from '../../localization/i18n';

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

