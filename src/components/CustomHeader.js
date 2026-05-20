import React, { useState } from 'react';
import { Image, Pressable, StatusBar, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CustomText from './CustomText';
import { useTranslation } from '../localization/i18n';

function DutySwitch({ dutyOn, onPress }) {
  const { tx } = useTranslation();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="switch"
      accessibilityState={{ checked: dutyOn }}
      accessibilityLabel={dutyOn ? tx('Online') : tx('Offline')}
      style={styles.dutyWrap}
      android_ripple={{ color: 'rgba(255,255,255,0.18)', borderless: true, radius: 24 }}
    >
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

// ─── Main Header ──────────────────────────────────────────────────────────────
export default function CustomHeader({
  userName = 'Aditya Soni',
  location = 'Hyderabad, Telangana',
  liveJobs = '3 live jobs',
  rating = '4.8',
}) {
  const [dutyOn, setDutyOn] = useState(true);
  const insets = useSafeAreaInsets();
  const { tx } = useTranslation();
  const firstName = userName.split(' ')[0];

  return (
    <View style={[styles.headerWrap, { paddingTop: insets.top + 6 }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4FAF2" />

      <LinearGradient
        colors={['#0B3B21', '#13753A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerCard}
      >
        <View style={styles.headerLeft}>
          <Image
            source={require('../../assets/images/logo/iconpngplain.png')}
            style={styles.logoIcon}
            resizeMode="contain"
          />

          <View style={styles.headerCopy}>
            <CustomText style={styles.headerTitle} numberOfLines={1}>
              {tx('Hi, {{name}} - {{location}}', { name: firstName, location })}
            </CustomText>
            <View style={styles.metaRow}>
              <View style={styles.metaPill}>
                <Ionicons name="briefcase" size={11} color="#DCFCE7" />
                <CustomText style={styles.metaText}>{tx(liveJobs)}</CustomText>
              </View>
              <View style={styles.metaPill}>
                <Ionicons name="star" size={11} color="#FCD34D" />
                <CustomText style={styles.metaText}>{rating}</CustomText>
              </View>
            </View>
          </View>
        </View>

        <DutySwitch dutyOn={dutyOn} onPress={() => setDutyOn((value) => !value)} />
      </LinearGradient>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  headerWrap: {
    backgroundColor: '#F4FAF2',
    paddingHorizontal: 14,
    paddingBottom: 6,
  },
  headerCard: {
    minHeight: 58,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#08341E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 8,
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoIcon: {
    width: 36,
    height: 36,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.13)',
  },
  headerCopy: {
    flex: 1,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    marginTop: 1,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 5,
  },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.13)',
  },
  metaText: {
    color: '#ECFDF5',
    fontSize: 10,
    fontWeight: '900',
  },
  dutyWrap: {
    alignItems: 'center',
    paddingLeft: 10,
  },
  dutyText: {
    display: 'none',
  },
  dutyTextActive: {
    color: '#FBBF24',
  },
  switchTrack: {
    width: 44,
    height: 26,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.24)',
    justifyContent: 'center',
    padding: 3,
  },
  switchTrackActive: {
    backgroundColor: '#F59E0B',
  },
  switchThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchThumbActive: {
    transform: [{ translateX: 18 }],
  },
  switchDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#94A3B8',
  },
  switchDotActive: {
    backgroundColor: '#F59E0B',
  },
});
