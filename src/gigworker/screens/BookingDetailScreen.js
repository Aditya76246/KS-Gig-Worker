import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

import CustomText from '../components/CustomText';
import globalStyles from '../../styles/globalStyles';
import { color } from '../../styles/theme';
import { useTranslation } from '../../localization/i18n';

const { width } = Dimensions.get('window');

export default function BookingDetailScreen({ route, navigation }) {
  const { booking } = route.params;
  const insets = useSafeAreaInsets();
  const { tx } = useTranslation();

  // Lifecycle State based on PRD
  const [jobStatus, setJobStatus] = useState(booking.status);
  const isNew = jobStatus === 'new';
  const isAccepted = jobStatus === 'accepted';
  const isOngoing = jobStatus === 'ongoing';
  const isCompleted = jobStatus === 'completed';

  const openMaps = () => {
    const lat = 14.4426; // Example coordinates
    const lng = 79.9865;
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0B3B21" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* ─── Hero Section (Screenshot 1) ─── */}
        <View style={styles.heroSection}>
          <Image
            source={require('../../../assets/images/Banner/Slider-2.png')}
            style={styles.heroImage}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.5)', 'transparent', 'rgba(0,0,0,0.8)']}
            style={styles.heroOverlay}
          >
            <TouchableOpacity
              style={[styles.backBtn, { top: insets.top + 10 }]}
              onPress={() => navigation.goBack()}
            >
              <CustomText style={styles.backBtnText}>Back</CustomText>
            </TouchableOpacity>

            <Animated.View entering={FadeInUp.delay(200)} style={styles.heroTextContainer}>
              <CustomText style={styles.cropTitle}>Paddy</CustomText>
              <CustomText style={styles.jobTypeTitle}>{tx(booking.service)}</CustomText>
            </Animated.View>
          </LinearGradient>
        </View>
        <View style={styles.contentBody}>

          {/* ─── Worker Pay Card (Overlapping) ─── */}
          <Animated.View entering={FadeInDown.delay(100)} style={styles.payCard}>
            <View>
              <CustomText style={styles.labelSmall}>{tx('Worker pay')}</CustomText>
              <CustomText style={styles.payAmount}>{booking.price}/day</CustomText>
            </View>
            <View style={styles.distanceBadge}>
              <CustomText style={styles.distanceText}>{booking.distance}</CustomText>
            </View>
          </Animated.View>

          {/* ─── Info Grid (2x2 Layout from Screenshot) ─── */}
          <View style={styles.infoGrid}>
            <InfoBox label={tx("Farmer")} value={booking.farmerName} />
            <InfoBox label={tx("Village")} value={booking.location} />
            <InfoBox label={tx("Start")} value={booking.date} />
            <InfoBox label={tx("Team")} value={tx("6 workers needed")} />
          </View>

          {/* ─── Job Lifecycle (PRD Step-by-Step) ─── */}
          <View style={styles.card}>
            <CustomText style={styles.cardHeaderTitle}>{tx('Job lifecycle')}</CustomText>
            <LifecycleStep number="1" title={tx("Accept job")} desc={tx("Worker confirms availability")} />
            <LifecycleStep number="2" title={tx("Navigate to farm")} desc={tx("Open farm location and route")} />
            <LifecycleStep number="3" title={tx("GPS punch-in")} desc={tx("Start time saved offline if needed")} />
            <LifecycleStep number="4" title={tx("Proof and punch-out")} desc={tx("Photo proof and payment request")} isLast />
          </View>

          {/* ─── Pricing & Settlement (Screenshot 2) ─── */}
          <View style={styles.card}>
            <CustomText style={styles.cardHeaderTitle}>{tx('Pricing and settlement')}</CustomText>
            <SettlementRow label={tx("Base wage")} value={booking.price + "/day"} />
            <SettlementRow label={tx("Platform/FPO commission")} value="5 percent" />
            <SettlementRow label={tx("Payment mode")} value={tx("Cash or online")} isLast />
          </View>

          {/* ─── Completion Proof (PRD Requirement) ─── */}
          <View style={styles.card}>
            <CustomText style={styles.cardHeaderTitle}>{tx('Completion proof')}</CustomText>
            <CustomText style={styles.helperText}>
              {tx("Upload one farm photo after work completion. This static demo shows the flow only.")}
            </CustomText>
            <TouchableOpacity style={styles.addProofBtn}>
              <Ionicons name="camera" size={20} color={color.GREEN} style={{ marginRight: 8 }} />
              <CustomText style={styles.addProofText}>{tx('Add Proof Photo')}</CustomText>
            </TouchableOpacity>
          </View>

          {/* ─── Location Map (From Previous Design) ─── */}
          <View style={styles.card}>
            <CustomText style={styles.cardHeaderTitle}>{tx("Navigation Map")}</CustomText>
            <TouchableOpacity onPress={openMaps} activeOpacity={0.9} style={styles.mapContainer}>
              <Image source={require('../../../assets/images/Banner/Slider-4.png')} style={styles.mapImage} opacity={0.3} />
              <View style={styles.mapOverlayContent}>
                <Ionicons name="navigate-circle" size={44} color={color.GREEN} />
                <CustomText style={styles.mapLabel}>{tx("Open Navigation")}</CustomText>
                <CustomText style={styles.mapSubText}>{booking.location}</CustomText>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* ─── Sticky Footer Actions (Screenshot 2) ─── */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 10 }]}>
        <TouchableOpacity
          style={[styles.footerBtn, styles.primaryBtn]}
          onPress={() => Alert.alert(tx("Job Accepted"))}
        >
          <CustomText style={styles.primaryBtnText}>{tx("Accept Job")}</CustomText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.footerBtn, styles.secondaryBtn]}
          onPress={() => Alert.alert(tx("GPS Punch In"), tx("Location Verified via GPS"))}
        >
          <CustomText style={styles.secondaryBtnText}>{tx("GPS Punch In")}</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Sub-Components ───

const InfoBox = ({ label, value }) => (
  <View style={styles.infoBox}>
    <CustomText style={styles.labelSmall}>{label}</CustomText>
    <CustomText style={styles.valueLarge} numberOfLines={1}>{value}</CustomText>
  </View>
);

const LifecycleStep = ({ number, title, desc, isLast }) => (
  <View style={styles.stepContainer}>
    <View style={styles.stepLeft}>
      <View style={styles.stepCircle}><CustomText style={styles.stepNumber}>{number}</CustomText></View>
      {!isLast && <View style={styles.stepLine} />}
    </View>
    <View style={styles.stepRight}>
      <CustomText style={styles.stepTitle}>{title}</CustomText>
      <CustomText style={styles.stepDesc}>{desc}</CustomText>
    </View>
  </View>
);

const SettlementRow = ({ label, value, isLast }) => (
  <View style={[styles.settlementRow, isLast && { borderBottomWidth: 0 }]}>
    <CustomText style={styles.settlementLabel}>{label}</CustomText>
    <CustomText style={styles.settlementValue}>{value}</CustomText>
  </View>
);

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4FAF2' },

  // Hero Styles
  heroSection: { height: 285, width: '100%', overflow: 'visible' },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, padding: 20, justifyContent: 'flex-end' },
  backBtn: {
    position: 'absolute',
    left: 15,
    backgroundColor: '#FFF',
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 5,
  },
  backBtnText: { fontWeight: '900', fontSize: 15, color: '#102A18' },
  heroTextContainer: { marginBottom: 20 },
  cropTitle: { color: '#BBF7D0', fontSize: 18, fontWeight: '800' },
  jobTypeTitle: { color: '#FFF', fontSize: 34, fontWeight: '900', lineHeight: 40 },

  contentBody: { paddingHorizontal: 20, marginTop: -30, zIndex: 999, elevation: 20, },

  // Overlapping Pay Card
  payCard: {
    backgroundColor: '#FFF',
    borderRadius: 26,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#08341E',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 10,
    zIndex: 100,
  },
  payAmount: { fontSize: 24, fontWeight: '900', color: '#116834', marginTop: 4 },
  distanceBadge: { backgroundColor: '#F0FDF4', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 12 },
  distanceText: { color: '#116834', fontWeight: '900' },

  // Info Grid
  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 5 },
  infoBox: {
    backgroundColor: '#FFF',
    width: '48.5%',
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E8F5E9',
  },
  labelSmall: { fontSize: 11, color: '#647A69', fontWeight: '800', textTransform: 'uppercase' },
  valueLarge: { fontSize: 15, fontWeight: '900', color: '#102A18', marginTop: 4 },

  // Card UI
  card: { backgroundColor: '#FFF', borderRadius: 24, padding: 20, marginBottom: 15, borderWidth: 1, borderColor: '#E8F5E9' },
  cardHeaderTitle: { fontSize: 18, fontWeight: '900', color: '#102A18', marginBottom: 18 },

  // Lifecycle
  stepContainer: { flexDirection: 'row', height: 75 },
  stepLeft: { alignItems: 'center', marginRight: 15 },
  stepCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#F0FDF4', justifyContent: 'center', alignItems: 'center' },
  stepNumber: { color: '#116834', fontWeight: '900' },
  stepLine: { width: 2, flex: 1, backgroundColor: '#E8F5E9', marginVertical: 4 },
  stepRight: { flex: 1 },
  stepTitle: { fontSize: 16, fontWeight: '900', color: '#102A18' },
  stepDesc: { fontSize: 13, color: '#647A69', fontWeight: '600', marginTop: 2 },

  // Settlement Row
  settlementRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: 1, borderColor: '#F1F5F9' },
  settlementLabel: { color: '#647A69', fontSize: 14, fontWeight: '600' },
  settlementValue: { fontWeight: '900', color: '#102A18', fontSize: 14 },

  // Proof Section
  helperText: { color: '#647A69', fontSize: 13, lineHeight: 20, fontWeight: '600' },
  addProofBtn: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: '#116834',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  addProofText: { color: '#116834', fontWeight: '900', fontSize: 15 },

  // Map
  mapContainer: { height: 150, borderRadius: 18, backgroundColor: '#F8FAFC', overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
  mapImage: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  mapOverlayContent: { alignItems: 'center' },
  mapLabel: { color: '#116834', fontWeight: '900', marginTop: 5 },
  mapSubText: { fontSize: 11, color: '#647A69', fontWeight: '600' },

  // Sticky Footer
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 20,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    elevation: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    justifyContent: 'space-between',
  },
  footerBtn: {
    width: '48%',
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtn: { backgroundColor: '#116834' },
  primaryBtnText: { color: '#FFF', fontWeight: '900', fontSize: 15 },
  secondaryBtn: { backgroundColor: '#F0FDF4' },
  secondaryBtnText: { color: '#116834', fontWeight: '900', fontSize: 15 },
});


