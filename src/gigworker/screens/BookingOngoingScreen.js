import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
  Modal,
  Pressable,
  TextInput,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

import CustomText from '../components/CustomText';
import Notifications, {
  getUnreadNotificationCount,
  notificationItems,
} from '../components/Notifications';
import { color } from '../../styles/theme';
import { useTranslation } from '../../localization/i18n';

export default function BookingOngoingScreen({ route, navigation }) {
  const { booking } = route.params || {};
  const jobStatus = booking?.status || 'ongoing';
  const isOngoing = jobStatus === 'ongoing';
  const insets = useSafeAreaInsets();
  const { tx } = useTranslation();
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
  const [ratingValue, setRatingValue] = useState(4);
  const [feedbackText, setFeedbackText] = useState('');
  const unreadCount = getUnreadNotificationCount(notificationItems);

  const stars = [1, 2, 3, 4, 5];

  const handleSubmitRating = () => {
    setRatingModalVisible(false);
    Alert.alert(tx('Rating submitted'), tx('Thank you for sharing your rating'));
  };

  const handleSubmitFeedback = () => {
    setFeedbackModalVisible(false);
    Alert.alert(tx('Feedback submitted'), tx('Thank you for your feedback'));
    setFeedbackText('');
  };

  const openMaps = () => {
    // fallback coordinates; ideally booking should include lat/lng
    const lat = booking?.lat || 14.4426;
    const lng = booking?.lng || 79.9865;
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    Linking.openURL(url).catch(() => Alert.alert(tx('Error'), tx('Unable to open maps')));
  };

  const markCompleted = () => {
    Alert.alert(tx('Mark completed'), tx('Mark this job as completed?'), [
      { text: tx('Cancel'), style: 'cancel' },
      { text: tx('Yes'), onPress: () => navigation.navigate('BookingCompleted', { booking: { ...booking, status: 'completed' } }) },
    ]);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#082F1B" />

      <Notifications
        visible={notificationsVisible}
        onClose={() => setNotificationsVisible(false)}
      />

      <Modal
        visible={ratingModalVisible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setRatingModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setRatingModalVisible(false)} />
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <CustomText style={styles.modalTitle}>{tx('Give rating')}</CustomText>
            <CustomText style={styles.modalSubtitle}>{tx('Rate the completed booking')}</CustomText>
          </View>
          <View style={styles.starRow}>
            {stars.map((star) => (
              <TouchableOpacity
                key={star}
                activeOpacity={0.8}
                onPress={() => setRatingValue(star)}
                style={styles.starButton}
              >
                <Ionicons
                  name={ratingValue >= star ? 'star' : 'star-outline'}
                  size={34}
                  color={ratingValue >= star ? color.YELLOW : color.textMuted}
                />
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={[styles.modalActionBtn, styles.primaryBtn]}
            onPress={handleSubmitRating}
          >
            <CustomText style={styles.modalActionText}>{tx('Submit rating')}</CustomText>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        visible={feedbackModalVisible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setFeedbackModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setFeedbackModalVisible(false)} />
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <CustomText style={styles.modalTitle}>{tx('Give feedback')}</CustomText>
            <CustomText style={styles.modalSubtitle}>{tx('Share your experience with the farmer and work')}</CustomText>
          </View>
          <TextInput
            style={styles.feedbackInput}
            placeholder={tx('Type your feedback here')}
            placeholderTextColor={color.textMuted}
            value={feedbackText}
            onChangeText={setFeedbackText}
            multiline
            numberOfLines={4}
          />
          <TouchableOpacity
            style={[styles.modalActionBtn, styles.primaryBtn]}
            onPress={handleSubmitFeedback}
          >
            <CustomText style={styles.modalActionText}>{tx('Submit feedback')}</CustomText>
          </TouchableOpacity>
        </View>
      </Modal>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
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
              <CustomText style={styles.backBtnText}>{tx('Back')}</CustomText>
            </TouchableOpacity>

            <Animated.View entering={FadeInUp.delay(200)} style={styles.heroTextContainer}>
              <CustomText style={styles.cropTitle}>{isOngoing ? tx('Job in progress') : tx('Booking completed')}</CustomText>
                <CustomText style={styles.jobTypeTitle}>{tx(booking?.service)}</CustomText>
            </Animated.View>
          </LinearGradient>
        </View>

        <View style={styles.contentBody}>
          <Animated.View entering={FadeInDown.delay(100)} style={styles.payCard}>
            <View>
              <CustomText style={styles.labelSmall}>{tx('Worker pay')}</CustomText>
              <CustomText style={styles.payAmount}>{booking.price}</CustomText>
            </View>
            <View style={styles.distanceBadge}>
              <CustomText style={styles.distanceText}>{booking.distance}</CustomText>
            </View>
          </Animated.View>

          <View style={styles.infoGrid}>
            <InfoBox label={tx('Farmer')} value={booking.farmerName} />
            <InfoBox label={tx('Village')} value={booking.location} />
            <InfoBox label={tx('Start')} value={booking.date} />
            <InfoBox label={tx('Team')} value={tx('6 workers needed')} />
          </View>

          <View style={styles.card}>
            <CustomText style={styles.cardHeaderTitle}>{tx('Booking summary')}</CustomText>
            <SummaryRow label={isOngoing ? tx('Start time') : tx('Completed on')} value={booking.date} />
            <SummaryRow label={tx('Total paid')} value={booking.price} />
            <SummaryRow label={tx('Farmer')} value={booking.farmerName} />
          </View>

          <View style={styles.card}>
            <CustomText style={styles.cardHeaderTitle}>{tx('Job lifecycle')}</CustomText>
            <LifecycleStep number="1" title={tx('Accept job')} desc={tx('Worker confirms availability')} />
            <LifecycleStep number="2" title={tx('Navigate to farm')} desc={tx('Open farm location and route')} />
            <LifecycleStep number="3" title={tx('GPS punch-in')} desc={tx('Start time saved offline if needed')} />
            <LifecycleStep number="4" title={tx('Proof and punch-out')} desc={tx('Photo proof and payment request')} isLast />
          </View>

          <View style={styles.card}>
            <CustomText style={styles.cardHeaderTitle}>{tx('Pricing and settlement')}</CustomText>
            <SettlementRow label={tx('Base wage')} value={booking.price} />
            <SettlementRow label={tx('Platform/FPO commission')} value={tx('5 percent')} />
            <SettlementRow label={tx('Payment mode')} value={tx('Cash or online')} isLast />
          </View>

          <View style={styles.card}>
            <CustomText style={styles.cardHeaderTitle}>{tx('Completion proof')}</CustomText>
            <CustomText style={styles.helperText}>
              {tx('Upload one farm photo after work completion. This static demo shows the flow only.')}
            </CustomText>
            <TouchableOpacity style={styles.addProofBtn} onPress={() => Alert.alert(tx('Add Proof Photo'))}>
              <Ionicons name="camera" size={20} color={color.GREEN} style={{ marginRight: 8 }} />
              <CustomText style={styles.addProofText}>{tx('Add Proof Photo')}</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 10 }]}> 
        {isOngoing ? (
          <>
            <TouchableOpacity
              style={[styles.footerBtn, styles.primaryBtn]}
              onPress={openMaps}
            >
              <CustomText style={styles.primaryBtnText}>{tx('Open Navigation')}</CustomText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.footerBtn, styles.secondaryBtn]}
              onPress={markCompleted}
            >
              <CustomText style={styles.secondaryBtnText}>{tx('Mark completed')}</CustomText>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={[styles.footerBtn, styles.primaryBtn]}
              onPress={() => setRatingModalVisible(true)}
            >
              <CustomText style={styles.primaryBtnText}>{tx('Give rating')}</CustomText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.footerBtn, styles.secondaryBtn]}
              onPress={() => setFeedbackModalVisible(true)}
            >
              <CustomText style={styles.secondaryBtnText}>{tx('Give feedback')}</CustomText>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const InfoBox = ({ label, value }) => (
  <View style={styles.infoBox}>
    <CustomText style={styles.labelSmall}>{label}</CustomText>
    <CustomText style={styles.valueLarge} numberOfLines={1}>{value}</CustomText>
  </View>
);

const SummaryRow = ({ label, value }) => (
  <View style={styles.summaryRow}>
    <CustomText style={styles.summaryLabel}>{label}</CustomText>
    <CustomText style={styles.summaryValue}>{value}</CustomText>
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
  root: {
    flex: 1,
    backgroundColor: '#F4FAF2',
  },
  heroSection: {
    height: 285,
    width: '100%',
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 20,
    justifyContent: 'flex-end',
  },
  backBtn: {
    position: 'absolute',
    left: 15,
    backgroundColor: '#FFF',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 6,
  },
  backBtnText: {
    color: '#102A18',
    fontWeight: '900',
    fontSize: 15,
  },
  heroTextContainer: {
    marginBottom: 20,
  },
  cropTitle: {
    color: '#BBF7D0',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 8,
  },
  jobTypeTitle: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 38,
  },
  statusBadge: {
    marginTop: 12,
    alignSelf: 'flex-start',
    backgroundColor: '#16A34A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  statusBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '900',
  },
  contentBody: {
    paddingHorizontal: 20,
    marginTop: -30,
    zIndex: 999,
    elevation: 20,
  },
  payCard: {
    backgroundColor: '#FFF',
    borderRadius: 26,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
    marginBottom: 15,
  },
  labelSmall: {
    fontSize: 11,
    color: '#647A69',
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  payAmount: {
    fontSize: 24,
    fontWeight: '900',
    color: '#116834',
    marginTop: 4,
  },
  distanceBadge: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 12,
  },
  distanceText: {
    color: '#116834',
    fontWeight: '900',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  infoBox: {
    backgroundColor: '#FFF',
    width: '48.5%',
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E8F5E9',
  },
  valueLarge: {
    fontSize: 15,
    fontWeight: '900',
    color: '#102A18',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E8F5E9',
  },
  cardHeaderTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#102A18',
    marginBottom: 18,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  summaryLabel: {
    color: '#647A69',
    fontSize: 14,
    fontWeight: '600',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '900',
    color: '#102A18',
  },
  stepContainer: {
    flexDirection: 'row',
    height: 75,
  },
  stepLeft: {
    alignItems: 'center',
    marginRight: 15,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: {
    color: '#116834',
    fontWeight: '900',
  },
  stepLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E8F5E9',
    marginVertical: 4,
  },
  stepRight: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#102A18',
  },
  stepDesc: {
    fontSize: 13,
    color: '#647A69',
    fontWeight: '600',
    marginTop: 2,
  },
  settlementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  settlementLabel: {
    color: '#647A69',
    fontSize: 14,
    fontWeight: '600',
  },
  settlementValue: {
    fontWeight: '900',
    color: '#102A18',
    fontSize: 14,
  },
  helperText: {
    color: '#647A69',
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '600',
  },
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
  addProofText: {
    color: '#116834',
    fontWeight: '900',
    fontSize: 15,
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  modalContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    top: '32%',
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 22,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 18,
  },
  modalHeader: {
    marginBottom: 18,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#102A18',
    marginBottom: 6,
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#647A69',
    lineHeight: 19,
  },
  starRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  starButton: {
    flex: 1,
    alignItems: 'center',
  },
  feedbackInput: {
    backgroundColor: '#F3F9F1',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D8E8D5',
    padding: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    color: '#102A18',
    marginBottom: 22,
  },
  modalActionBtn: {
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  modalActionText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 15,
  },
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
  primaryBtn: {
    backgroundColor: '#116834',
  },
  notificationBar: {
    paddingHorizontal: 20,
    paddingBottom: 18,
  },
  notificationBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationText: {
    flex: 1,
    marginRight: 12,
  },
  notificationTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  notificationSubtitle: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
  bellButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
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
    borderColor: '#082F1B',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
  },

  primaryBtnText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 15,
  },
  secondaryBtn: {
    backgroundColor: '#F0FDF4',
  },
  secondaryBtnText: {
    color: '#116834',
    fontWeight: '900',
    fontSize: 15,
  },
});
