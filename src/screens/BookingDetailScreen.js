import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';

import CustomText from '../components/CustomText';
import InnerScreenHeader from '../components/InnerScreenHeader';
import globalStyles from '../styles/globalStyles';
import { color } from '../styles/theme';
import { useTranslation } from '../localization/i18n';

// ─── Sub-components (Themed) ──────────────────────────────────────────────────

function InfoRow({ icon, label, value, lib = 'Ionicons', accent = false }) {
  const IconComp = lib === 'MaterialCommunityIcons' ? MaterialCommunityIcons
    : lib === 'FontAwesome5' ? FontAwesome5
    : Ionicons;
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIconBox}>
        <IconComp name={icon} size={18} color="#15803D" />
      </View>
      <View style={styles.infoText}>
        <CustomText style={styles.infoLabel}>{label}</CustomText>
        <CustomText style={[styles.infoValue, accent && styles.infoValueAccent]}>
          {value}
        </CustomText>
      </View>
    </View>
  );
}

function SectionCard({ title, children, delay = 0 }) {
  return (
    <Animated.View entering={FadeInDown.delay(delay).duration(400)} style={styles.sectionCard}>
      <CustomText style={styles.sectionTitle}>{title}</CustomText>
      <View style={styles.sectionBody}>{children}</View>
    </Animated.View>
  );
}

function StatusBadge({ status, tx }) {
  const map = {
    new:       { label: tx('New Request'), bg: '#F0FDF4',   text: '#16A34A',      icon: 'radio-button-on' },
    accepted:  { label: tx('Accepted'),    bg: '#FFF9E6',  text: '#D97706', icon: 'checkmark-circle' },
    ongoing:   { label: tx('Ongoing'),     bg: '#FDF2F8',        text: '#9D174D',        icon: 'time' },
    completed: { label: tx('Completed'),   bg: '#F0FDF4',   text: '#15803D',      icon: 'checkmark-done-circle' },
  };
  const s = map[status] || map.new;
  return (
    <View style={[styles.statusBadge, { backgroundColor: s.bg }]}>
      <Ionicons name={s.icon} size={14} color={s.text} />
      <CustomText style={[styles.statusText, { color: s.text }]}>{s.label}</CustomText>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function BookingDetailScreen({ navigation, route }) {
  const { booking } = route.params;
  const [status, setStatus] = useState(booking.status);
  const insets = useSafeAreaInsets();
  const { tx } = useTranslation();

  const handleAccept = () => {
    Alert.alert(tx('Accept Booking Title'), tx('Accept job from {{name}}?', { name: booking.farmerName }), [
      { text: tx('Cancel'), style: 'cancel' },
      { text: tx('Accept'), onPress: () => setStatus('accepted') },
    ]);
  };

  const handleReject = () => {
    Alert.alert(tx('Reject Booking'), tx('Are you sure you want to reject this booking?'), [
      { text: tx('Cancel'), style: 'cancel' },
      { text: tx('Reject'), style: 'destructive', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#082F1B" />

      {/* ── Slim Header Gradient ── */}
     <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
  <StatusBar barStyle="dark-content" backgroundColor="#F4FAF2" />
  
  <TouchableOpacity 
    style={styles.backButton} 
    onPress={() => navigation.goBack()}
  >
    <Ionicons name="chevron-back" size={24} color="#102A18" />
  </TouchableOpacity>

  <CustomText style={styles.headerTitle}>
    {tx('Booking Details')}
  </CustomText>

  {/* Empty view to balance the title in the center */}
  <View style={{ width: 40 }} /> 
</View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Farmer Hero Card (Floating) ── */}
        <Animated.View entering={FadeInDown.delay(60).duration(400)} style={styles.heroCard}>
          <View style={styles.heroLeft}>
            <View style={styles.heroAvatar}>
              <Ionicons name="person" size={32} color="#CBD5E1" />
            </View>
            <View style={styles.heroInfo}>
              <CustomText style={styles.heroName}>{booking.farmerName}</CustomText>
              <View style={styles.idRow}>
                <CustomText style={styles.heroId}>ID: #{booking.id}</CustomText>
                <StatusBadge status={status} tx={tx} />
              </View>
            </View>
          </View>
          <View style={styles.heroPriceBox}>
            <CustomText style={styles.heroPriceLabel}>{tx('Estimate')}</CustomText>
            <CustomText style={styles.heroPrice}>{booking.price}</CustomText>
          </View>
        </Animated.View>

        {/* ── Job Details ── */}
        <SectionCard title={tx('Job Information')} delay={120}>
          <InfoRow icon="construct-outline" label={tx('Service Type')} value={tx(booking.service)} />
          <View style={styles.divider} />
          <InfoRow icon="resize-outline" label={tx('Area Size')} value={booking.area} accent />
          <View style={styles.divider} />
          <InfoRow icon="calendar-outline" label={tx('Schedule')} value={tx(booking.date)} />
          <View style={styles.divider} />
          <InfoRow icon="location-outline" label={tx('Distance')} value={tx(booking.distance)} accent />
        </SectionCard>

        {/* ── Description ── */}
        <SectionCard title={tx('Notes from Farmer')} delay={180}>
          <View style={styles.descriptionBox}>
            <CustomText style={styles.descriptionText}>{tx(booking.description)}</CustomText>
          </View>
        </SectionCard>

        {/* ── Payment Breakdown ── */}
        <SectionCard title={tx('Payment Summary')} delay={240}>
          <View style={styles.payRow}>
            <CustomText style={styles.payLabel}>{tx('Base Work Rate')}</CustomText>
            <CustomText style={styles.payValue}>{booking.price}</CustomText>
          </View>
          <View style={styles.divider} />
          <View style={[styles.payRow, styles.totalBox]}>
            <CustomText style={styles.totalLabel}>{tx('Total Expected')}</CustomText>
            <CustomText style={styles.totalValue}>{booking.price}</CustomText>
          </View>
        </SectionCard>

        {/* ── Location ── */}
        <SectionCard title={tx('Work Location')} delay={300}>
          <InfoRow icon="map-outline" label={tx('Village / Area')} value={tx(booking.location)} />
          <View style={styles.divider} />
          <View style={styles.mapPlaceholder}>
             <Ionicons name="map" size={24} color="#15803D" />
             <CustomText style={styles.mapText}>{tx('Tap to view on map')}</CustomText>
          </View>
        </SectionCard>
      </ScrollView>

      {/* ── Fixed Bottom Actions (Themed) ── */}
      <View style={styles.footerContainer}>
        {(status === 'new' || status === 'accepted') ? (
          <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.rejectBtn} onPress={handleReject}>
              <CustomText style={styles.rejectText}>{status === 'new' ? tx('Reject') : tx('Cancel')}</CustomText>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.acceptBtn} onPress={status === 'new' ? handleAccept : () => {}} activeOpacity={0.9}>
              <LinearGradient colors={['#16A34A', '#15803D']} style={styles.btnGradient}>
                <Ionicons name={status === 'new' ? "checkmark-circle" : "navigate"} size={18} color="#FFF" />
                <CustomText style={styles.acceptText}>
                  {status === 'new' ? tx('Accept Booking') : tx('Start Navigation')}
                </CustomText>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.fullBtn} onPress={() => navigation.goBack()}>
            <LinearGradient colors={['#16A34A', '#15803D']} style={styles.btnGradient}>
              <CustomText style={styles.acceptText}>{tx('Back to List')}</CustomText>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F4FAF2',
  },
   headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#F4FAF2',
    // Optional: add a very subtle shadow or bottom border
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)', 
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8F5E9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#102A18',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10, // Reduced since we don't need to overlap anymore
    gap: 15,
  },
  heroCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 16,
    marginTop: 5, // Changed from negative to positive for a clean look
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#08341E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E8F5E9',
  },
  slimHero: {
    paddingBottom: 40,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 15,
  },
  // Overlapping Hero Card
  heroCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 16,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#08341E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E8F5E9',
  },
  heroLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  heroAvatar: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroInfo: {
    flex: 1,
  },
  heroName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#102A18',
  },
  idRow: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  heroId: {
    fontSize: 12,
    fontWeight: '700',
    color: '#647A69',
  },
  heroPriceBox: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  heroPriceLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
  },
  heroPrice: {
    fontSize: 18,
    fontWeight: '900',
    color: '#D97706',
  },
  // Status Badge
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '900',
  },
  // Section Cards
  sectionCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E8F5E9',
    shadowColor: '#08341E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: '#12351F',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  // Info Row
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 10,
  },
  infoIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: '#647A69',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#102A18',
    marginTop: 1,
  },
  infoValueAccent: {
    color: '#16A34A',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F2',
    marginLeft: 54,
  },
  // Description
  descriptionBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
  },
  descriptionText: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 20,
    fontWeight: '500',
  },
  // Payment Summary
  payRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  payLabel: {
    fontSize: 14,
    color: '#647A69',
    fontWeight: '600',
  },
  payValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#102A18',
  },
  totalBox: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 5,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '900',
    color: '#15803D',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#15803D',
  },
  // Map Placeholder
  mapPlaceholder: {
    height: 60,
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DCEBDD',
    borderStyle: 'dashed',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10,
  },
  mapText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#15803D',
  },
  // Footer / CTA
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#E8F5E9',
  },
  bottomBar: {
    flexDirection: 'row',
    gap: 12,
  },
  acceptBtn: {
    flex: 1.2,
    borderRadius: 16,
    overflow: 'hidden',
  },
  btnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  acceptText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFF',
  },
  rejectBtn: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FEE2E2',
  },
  rejectText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#E11D48',
  },
  fullBtn: {
    borderRadius: 16,
    overflow: 'hidden',
  }
});