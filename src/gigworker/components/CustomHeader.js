import React, { useState } from 'react';
import { Image, Pressable, StatusBar, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CustomText from './CustomText';
import { useTranslation } from '../../localization/i18n';
import { useNavigation } from '@react-navigation/native';
import Notifications, {
  getUnreadNotificationCount,
  notificationItems,
} from './Notifications';

/**
 * DUTY SWITCH COMPONENT
 * Matches the yellow toggle with the label above it
 */
function DutySwitch({ dutyOn, onPress }) {
  const { tx } = useTranslation();

  return (
    <Pressable onPress={onPress} style={styles.dutyWrap}>
      <CustomText style={[styles.dutyText, dutyOn && styles.dutyTextActive]}>
        {dutyOn ? tx('ONLINE') : tx('OFFLINE')}
      </CustomText>
      <View style={[styles.switchTrack, dutyOn && styles.switchTrackActive]}>
        <View style={[styles.switchThumb, dutyOn && styles.switchThumbActive]}>
          <View style={[styles.switchDot, dutyOn && styles.switchDotActive]} />
        </View>
      </View>
    </Pressable>
  );
}

// ─── Main Global Header ──────────────────────────────────────────────────────
export default function CustomHeader({
  location = 'Hyderabad, Telangana',
  notificationCount = getUnreadNotificationCount(notificationItems),
}) {
  const [dutyOn, setDutyOn] = useState(true);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const { tx } = useTranslation();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#082F1B" />

      <LinearGradient
        colors={['#082F1B', '#116834', '#2F8C44']} // Exact gradient from screenshot
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.hero, { paddingTop: insets.top + 6 }]}
      >
        {/* Top Section: Branding, Notification, and Switch */}
        <View style={styles.topBar}>
          <Pressable style={styles.heroIdentity} onPress={() => navigation.navigate('HomeTab', { screen: 'HomeMain' })}>
            <Image
              source={require('../../../assets/icons/icon.png')}
              style={styles.logoIcon}
              resizeMode="contain"
            />
            <View style={styles.brandCopy}>
              <CustomText style={styles.brand}>Kisan Sahakar</CustomText>
              <CustomText style={styles.brandSub}>{tx('Gig Worker App')}</CustomText>
            </View>
          </Pressable>

          <View style={styles.topActions}>
            {/* Notification Bell */}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={tx('Open notifications')}
              style={styles.bellButton}
              onPress={() => setNotificationsVisible(true)}
            >
              <Ionicons name="notifications" size={20} color="#FFFFFF" />
              <View style={styles.badge}>
                <CustomText style={styles.badgeText}>{notificationCount}</CustomText>
              </View>
            </Pressable>

            {/* Duty Switch */}
            <DutySwitch dutyOn={dutyOn} onPress={() => setDutyOn((v) => !v)} />
          </View>
        </View>

        {/* Bottom Section: Location Pill */}
        <Pressable style={styles.locationPill}>
          <Ionicons name="location-sharp" size={13} color="#FBBF24" />
          <CustomText style={styles.locationText} numberOfLines={1}>
            {tx('Near {{location}}', { location })}
          </CustomText>
          <Ionicons name="chevron-down" size={12} color="rgba(255,255,255,0.66)" />
        </Pressable>
      </LinearGradient>

      <Notifications
        visible={notificationsVisible}
        onClose={() => setNotificationsVisible(false)}
      />
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4FAF2',
  },
  hero: {
    paddingHorizontal: 20,
    paddingBottom: 6,
    // borderBottomLeftRadius: 32,
    // borderBottomRightRadius: 32,
    overflow: 'hidden',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroIdentity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  logoIcon: {
    width: 35,
    height: 34,
    // borderRadius: 14,
    // backgroundColor: 'rgba(255,255,255,0.12)',
  },
  brandCopy: {
    flex: 1,
  },
  brand: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  brandSub: {
    color: '#D7F5DE',
    fontSize: 9,
    fontWeight: '800',
    marginTop: 2,
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bellButton: {
    width: 38,
    height: 38,
    borderRadius: 20,
    // backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  badge: {
    position: 'absolute',
    top: 5,
    right: 5,
    minWidth: 14,
    height: 14,
    borderRadius: 9,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#0B3B21',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
  },
  // Switch Styles
  dutyWrap: {
    alignItems: 'center',
    gap: 4,
  },
  dutyText: {
    color: 'rgba(255,255,255,0.56)',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1,
  },
  dutyTextActive: {
    color: '#FBBF24',
  },
  switchTrack: {
    width: 44,
    height: 22,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.24)',
    justifyContent: 'center',
    padding: 3,
  },
  switchTrackActive: {
    backgroundColor: '#F59E0B',
  },
  switchThumb: {
    width: 16,
    height: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchThumbActive: {
    transform: [{ translateX: 22 }],
  },
  switchDot: {
    width: 3,
    height: 3,
    borderRadius: 3,
    backgroundColor: '#94A3B8',
  },
  switchDotActive: {
    backgroundColor: '#F59E0B',
  },
  // Location Pill Styles
  locationPill: {
    alignSelf: 'flex-start',
    width: '100%',
    minHeight: 25,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 7,
  },
  locationText: {
    flex: 1,
    color: '#DDFBE5',
    fontSize: 11,
    fontWeight: '800',
  },
});


