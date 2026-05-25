import React, { useState } from 'react';
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

// ─── Mock Data (Unchanged) ──────────────────────────────────────────────────
const BOOKINGS = [
  {
    id: 'KA-8821',
    status: 'new',
    farmerName: 'Rajesh Kumar',
    farmerAvatar: null,
    service: 'Tractor Ploughing',
    date: 'Today, 4:30 PM',
    distance: '4.2 km away',
    location: 'Nellore Sub-div',
    price: '₹2,450',
    area: '3.5 Acres',
    description: 'Farmer requests deep ploughing for 3.5 acres of cotton field near the irrigation canal.',
  },
  {
    id: 'KA-9023',
    status: 'new',
    farmerName: 'Venkata Subbaiah',
    farmerAvatar: null,
    service: 'Harvester Rental',
    date: 'Oct 24, 08:00 AM',
    distance: '12.5 km away',
    location: 'Ongole Mandal',
    price: '₹8,000',
    area: '5 Acres',
    description: 'Farmer requests deep harvesting for 5 acres of paddy field near the main canal road.',
  },
  {
    id: 'KA-8750',
    status: 'accepted',
    farmerName: 'Suresh Reddy',
    farmerAvatar: null,
    service: 'Rotavator',
    date: 'Oct 23, 09:00 AM',
    distance: '6.1 km away',
    location: 'Kandukur Block',
    price: '₹3,200',
    area: '4.0 Acres',
    description: 'Rotavator service requested for 4 acres of groundnut field prior to sowing.',
  },
  {
    id: 'KA-8640',
    status: 'ongoing',
    farmerName: 'Ramana Murthy',
    farmerAvatar: null,
    service: 'Tractor Ploughing',
    date: 'Today, 2:00 PM',
    distance: '3.8 km away',
    location: 'Kavali Taluk',
    price: '₹1,800',
    area: '2.5 Acres',
    description: 'Ploughing for 2.5 acres of chilli field. Operator already en route.',
  },
  {
    id: 'KA-8520',
    status: 'completed',
    farmerName: 'Laxmi Devi',
    farmerAvatar: null,
    service: 'Seeder Machine',
    date: 'Oct 20, 07:00 AM',
    distance: '9.0 km away',
    location: 'Markapur Zone',
    price: '₹2,100',
    area: '3.0 Acres',
    description: 'Seed sowing service for paddy. Completed successfully.',
  },
];

const TABS = [
  { key: 'new', label: 'New' },
  { key: 'accepted', label: 'Accepted' },
  { key: 'ongoing', label: 'Ongoing' },
  { key: 'completed', label: 'Completed' },
];

// ─── Sub-components (Themed) ─────────────────────────────────────────────────

function DetailRow({ icon, text, tx }) {
  return (
    <View style={styles.detailItem}>
      <Ionicons name={icon} size={14} color="#15803D" />
      <CustomText style={styles.detailText} numberOfLines={1}>{text}</CustomText>
    </View>
  );
}

function BookingCard({ booking, onAccept, onReject, onViewDetails, delay, tx }) {
  const isNew = booking.status === 'new';

  return (
    <Animated.View entering={FadeInDown.delay(delay).duration(400)} style={styles.card}>
      {/* Card Header */}
      <View style={styles.cardHeader}>
        <View style={styles.avatarCircle}>
          <Ionicons name="person" size={24} color="#CBD5E1" />
        </View>
        <View style={styles.cardHeaderInfo}>
          <CustomText style={styles.farmerName}>{booking.farmerName}</CustomText>
          <View style={styles.idBadge}>
            <CustomText style={styles.bookingId}>ID: #{booking.id}</CustomText>
          </View>
        </View>
        <View style={[styles.priceTag, !isNew && styles.priceTagInactive]}>
          <CustomText style={[styles.priceValue, !isNew && styles.priceValueInactive]}>{booking.price}</CustomText>
        </View>
      </View>

      {/* Info Grid (Light themed boxes) */}
      <View style={styles.infoGrid}>
        <DetailRow icon="construct-outline" text={tx(booking.service)} />
        <DetailRow icon="calendar-outline" text={tx(booking.date)} />
        <DetailRow icon="location-outline" text={tx(booking.distance)} />
        <DetailRow icon="map-outline" text={tx(booking.location)} />
      </View>

      {/* Action Area */}
      <View style={styles.actionContainer}>
        {isNew && (
          <>
            <TouchableOpacity style={styles.acceptBtn} onPress={() => onAccept(booking.id)} activeOpacity={0.9}>
              <LinearGradient colors={['#16A34A', '#15803D']} style={styles.btnGradient}>
                <Ionicons name="checkmark-circle" size={16} color="#FFF" />
                <CustomText style={styles.btnText}>{tx('Accept')}</CustomText>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailsBtn} onPress={() => onViewDetails(booking)}>
              <CustomText style={styles.detailsBtnText}>{tx('View Details')}</CustomText>
            </TouchableOpacity>
          </>
        )}

        {booking.status === 'accepted' && (
          <>
            <TouchableOpacity style={styles.acceptBtn} onPress={() => onViewDetails(booking)}>
              <LinearGradient colors={['#16A34A', '#15803D']} style={styles.btnGradient}>
                <Ionicons name="eye" size={16} color="#FFF" />
                <CustomText style={styles.btnText}>{tx('Details')}</CustomText>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rejectBtn} onPress={() => onReject(booking.id)}>
              <CustomText style={styles.rejectBtnText}>{tx('Reject')}</CustomText>
            </TouchableOpacity>
          </>
        )}

        {booking.status === 'ongoing' && (
          <TouchableOpacity style={styles.trackBtn} onPress={() => onViewDetails(booking)}>
            <LinearGradient colors={['#0369A1', '#075985']} style={styles.btnGradient}>
              <Ionicons name="navigate" size={16} color="#FFF" />
              <CustomText style={styles.btnText}>{tx('Track Job')}</CustomText>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {booking.status === 'completed' && (
          <TouchableOpacity style={styles.summaryBtn} onPress={() => onViewDetails(booking)}>
            <CustomText style={styles.summaryBtnText}>{tx('View Summary')}</CustomText>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────

export default function BookingsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { bottomNavHidden, handleScroll } = useHideTabBarOnScroll();
  const { tx } = useTranslation();
  const [activeTab, setActiveTab] = useState('new');
  const [bookings, setBookings] = useState(BOOKINGS);

  const handleAccept = (id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'accepted' } : b));
  };

  const handleReject = (id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'completed' } : b));
  };

  const handleViewDetails = (booking) => {
    navigation.navigate('BookingDetail', { booking });
  };

  const filtered = bookings.filter(b => b.status === activeTab);
  const countFor = (key) => bookings.filter(b => b.status === key).length;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#082F1B" />

      {/* ── Floating Tabs ── */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
          {TABS.map((tab) => {
            const count = countFor(tab.key);
            const active = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tabBtn, active && styles.tabBtnActive]}
                onPress={() => setActiveTab(tab.key)}
              >
                <CustomText style={[styles.tabLabel, active && styles.tabLabelActive]}>
                  {tx(tab.label)}
                  {count > 0 ? ` (${count})` : ''}
                </CustomText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: bottomNavHidden ? insets.bottom + 22 : insets.bottom + 110 },
        ]}
      >
        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-clear-outline" size={60} color="#CBD5E1" />
            <CustomText style={styles.emptyTitle}>{tx('No bookings found')}</CustomText>
            <CustomText style={styles.emptySubtitle}>{tx('Your active and history will appear here')}</CustomText>
          </View>
        ) : (
          filtered.map((booking, i) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onAccept={handleAccept}
              onReject={handleReject}
              onViewDetails={handleViewDetails}
              delay={i * 80}
              tx={tx}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F4FAF2',
  },
  // Header
  slimHero: {
    paddingHorizontal: 20,
    paddingBottom: 40,
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
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  headerBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FBBF24',
  },
  // Tabs
  tabsContainer: {
    marginTop: 15,
    zIndex: 10,
  },
  tabsScroll: {
    paddingHorizontal: 20,
    gap: 10,
  },
  tabBtn: {
    backgroundColor: '#FFF',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E8F5E9',
    shadowColor: '#08341E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  tabBtnActive: {
    backgroundColor: '#116834',
    borderColor: '#116834',
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: '#647A69',
  },
  tabLabelActive: {
    color: '#FFF',
  },
  // Scroll Content
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 15,
  },
  // Card Styling
  card: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8F5E9',
    shadowColor: '#08341E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarCircle: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardHeaderInfo: {
    flex: 1,
  },
  farmerName: {
    fontSize: 16,
    fontWeight: '900',
    color: '#102A18',
  },
  idBadge: {
    backgroundColor: '#F0FDF4',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 2,
  },
  bookingId: {
    fontSize: 11,
    fontWeight: '800',
    color: '#16A34A',
  },
  priceTag: {
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  priceTagInactive: {
    backgroundColor: '#F1F5F9',
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '900',
    color: '#F59E0B',
  },
  priceValueInactive: {
    color: '#647A69',
  },
  // Info Grid
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    padding: 12,
    marginTop: 15,
    gap: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: '47%',
  },
  detailText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  // Actions
  actionContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  acceptBtn: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
  btnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
  },
  btnText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#FFF',
  },
  detailsBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#15803D',
  },
  detailsBtnText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#15803D',
  },
  rejectBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E11D48',
  },
  rejectBtnText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#E11D48',
  },
  trackBtn: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
  summaryBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    paddingVertical: 14,
  },
  summaryBtnText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#647A69',
  },
  // Empty State
  emptyState: {
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#12351F',
    marginTop: 15,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#647A69',
    marginTop: 5,
    textAlign: 'center',
  },
});

