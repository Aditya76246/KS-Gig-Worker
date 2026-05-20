// import React, { useState } from 'react';
// import { Image, Pressable, StatusBar, StyleSheet, View } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// import CustomText from './CustomText';
// import { useTranslation } from '../localization/i18n';

// function DutySwitch({ dutyOn, onPress }) {
//   const { tx } = useTranslation();

//   return (
//     <Pressable
//       onPress={onPress}
//       accessibilityRole="switch"
//       accessibilityState={{ checked: dutyOn }}
//       accessibilityLabel={dutyOn ? tx('Online') : tx('Offline')}
//       style={styles.dutyWrap}
//       android_ripple={{ color: 'rgba(255,255,255,0.18)', borderless: true, radius: 24 }}
//     >
//       <CustomText style={[styles.dutyText, dutyOn && styles.dutyTextActive]}>
//         {dutyOn ? tx('ONLINE') : tx('OFFLINE')}
//       </CustomText>
//       <View style={[styles.switchTrack, dutyOn && styles.switchTrackActive]}>
//         <View style={[styles.switchThumb, dutyOn && styles.switchThumbActive]}>
//           <View style={[styles.switchDot, dutyOn && styles.switchDotActive]} />
//         </View>
//       </View>
//     </Pressable>
//   );
// }

// // ─── Main Header ──────────────────────────────────────────────────────────────
// export default function CustomHeader({
//   userName = 'Aditya Soni',
//   location = 'Hyderabad, Telangana',
//   liveJobs = '3 live jobs',
//   rating = '4.8',
// }) {
//   const [dutyOn, setDutyOn] = useState(true);
//   const insets = useSafeAreaInsets();
//   const { tx } = useTranslation();
//   const firstName = userName.split(' ')[0];

//   return (
//     <View style={[styles.headerWrap, { paddingTop: insets.top + 6 }]}>
//       <StatusBar barStyle="light-content" backgroundColor="#0B3B21" />

//       <LinearGradient
//         colors={['#0B3B21', '#13753A']}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={styles.headerCard}
//       >
//         <View style={styles.headerLeft}>
//           <Image
//             source={require('../../assets/images/logo/iconpngplain.png')}
//             style={styles.logoIcon}
//             resizeMode="contain"
//           />

//           <View style={styles.headerCopy}>
//             <CustomText style={styles.headerTitle} numberOfLines={1}>
//               {tx('Hi, {{name}} - {{location}}', { name: firstName, location })}
//             </CustomText>
//             <View style={styles.metaRow}>
//               <View style={styles.metaPill}>
//                 <Ionicons name="briefcase" size={11} color="#DCFCE7" />
//                 <CustomText style={styles.metaText}>{tx(liveJobs)}</CustomText>
//               </View>
//               <View style={styles.metaPill}>
//                 <Ionicons name="star" size={11} color="#FCD34D" />
//                 <CustomText style={styles.metaText}>{rating}</CustomText>
//               </View>
//             </View>
//           </View>
//         </View>

//         <DutySwitch dutyOn={dutyOn} onPress={() => setDutyOn((value) => !value)} />
//       </LinearGradient>
//     </View>
//   );
// }

// // ─── Styles ───────────────────────────────────────────────────────────────────
// const styles = StyleSheet.create({
//   headerWrap: {
//     backgroundColor: '#F4FAF2',
//     paddingHorizontal: 14,
//     paddingBottom: 6,
//   },
//   headerCard: {
//     minHeight: 58,
//     borderRadius: 20,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.18)',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     shadowColor: '#08341E',
//     shadowOffset: { width: 0, height: 8 },
//     shadowOpacity: 0.1,
//     shadowRadius: 18,
//     elevation: 8,
//   },
//   headerLeft: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//   },
//   logoIcon: {
//     width: 36,
//     height: 36,
//     borderRadius: 13,
//     backgroundColor: 'rgba(255,255,255,0.13)',
//   },
//   headerCopy: {
//     flex: 1,
//   },
//   headerTitle: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     fontWeight: '900',
//     marginTop: 1,
//   },
//   metaRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 7,
//     marginTop: 5,
//   },
//   metaPill: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//     paddingHorizontal: 7,
//     paddingVertical: 4,
//     borderRadius: 999,
//     backgroundColor: 'rgba(255,255,255,0.13)',
//   },
//   metaText: {
//     color: '#ECFDF5',
//     fontSize: 10,
//     fontWeight: '900',
//   },
//   dutyWrap: {
//     alignItems: 'center',
//     paddingLeft: 10,
//   },
//   dutyText: {
//     display: 'none',
//   },
//   dutyTextActive: {
//     color: '#FBBF24',
//   },
//   switchTrack: {
//     width: 44,
//     height: 26,
//     borderRadius: 999,
//     backgroundColor: 'rgba(255,255,255,0.24)',
//     justifyContent: 'center',
//     padding: 3,
//   },
//   switchTrackActive: {
//     backgroundColor: '#F59E0B',
//   },
//   switchThumb: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     backgroundColor: '#FFFFFF',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   switchThumbActive: {
//     transform: [{ translateX: 18 }],
//   },
//   switchDot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: '#94A3B8',
//   },
//   switchDotActive: {
//     backgroundColor: '#F59E0B',
//   },
// });

/////////////////////////////////////////////////////////////

import React, { useState } from 'react';
import { Image, Pressable, StatusBar, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CustomText from './CustomText';
import { useTranslation } from '../localization/i18n';

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
  notificationCount = '2',
}) {
  const [dutyOn, setDutyOn] = useState(true);
  const insets = useSafeAreaInsets();
  const { tx } = useTranslation();

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
          <View style={styles.heroIdentity}>
            <Image
              source={require('../../assets/images/logo/iconpngplain.png')}
              style={styles.logoIcon}
              resizeMode="contain"
            />
            <View style={styles.brandCopy}>
              <CustomText style={styles.brand}>Kisan Sahakar</CustomText>
              <CustomText style={styles.brandSub}>{tx('Gig Worker App')}</CustomText>
            </View>
          </View>

          <View style={styles.topActions}>
            {/* Notification Bell */}
            <Pressable style={styles.bellButton}>
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
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.12)',
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
    backgroundColor: 'rgba(255,255,255,0.14)',
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