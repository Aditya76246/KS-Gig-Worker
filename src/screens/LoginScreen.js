import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  Layout,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle, Defs, LinearGradient, Stop, Ellipse, G } from 'react-native-svg';

import KSLogo from '../../assets/icons/icon2.png';
import globalStyles from '../styles/globalStyles';
import CustomText from '../components/CustomText';
import { color } from '../styles/theme';
import { useTranslation } from '../localization/i18n';

const { width: W, height: H } = Dimensions.get('window');
const GREEN  = '#2e7d32';
const ORANGE = '#e07b00';
const LIGHT_GREEN  = '#e8f5e9';
const LIGHT_ORANGE = '#fff3e0';
const SURFACE = '#f7faf7';
const BORDER  = '#c8e6c9';

/* ── Decorative top illustration ────────────────────────── */
const TopIllustration = () => (
  <Svg width={W} height={H * 0.38} viewBox={`0 0 ${W} ${H * 0.38}`}
    style={{ position: 'absolute', top: 0 }}>
    <Defs>
      <LinearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0%"   stopColor="#e8f5e9" />
        <Stop offset="100%" stopColor="#ffffff" />
      </LinearGradient>
      <LinearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0%"   stopColor={GREEN}  stopOpacity="0.12" />
        <Stop offset="100%" stopColor={ORANGE} stopOpacity="0.06" />
      </LinearGradient>
    </Defs>

    {/* Background fill */}
    <Path d={`M0,0 L${W},0 L${W},${H * 0.38} L0,${H * 0.38} Z`} fill="url(#bgGrad)" />

    {/* Large arc bottom curve */}
    <Path
      d={`M0,${H * 0.28} Q${W * 0.5},${H * 0.38} ${W},${H * 0.28} L${W},${H * 0.38} L0,${H * 0.38} Z`}
      fill="#ffffff"
    />

    {/* Decorative rings */}
    <Circle cx={W * 0.12} cy={H * 0.06} r="55" stroke={GREEN} strokeWidth="1" fill="none" opacity="0.12" />
    <Circle cx={W * 0.12} cy={H * 0.06} r="38" stroke={GREEN} strokeWidth="1" fill="none" opacity="0.1" />
    <Circle cx={W * 0.88} cy={H * 0.18} r="70" stroke={ORANGE} strokeWidth="1" fill="none" opacity="0.1" />
    <Circle cx={W * 0.88} cy={H * 0.18} r="46" stroke={ORANGE} strokeWidth="1" fill="none" opacity="0.08" />

    {/* Floating dots top left */}
    {[0,1,2,3].map(i => [0,1,2,3].map(j => (
      <Circle key={`${i}-${j}`}
        cx={W * 0.04 + i * 18} cy={H * 0.03 + j * 18}
        r={2} fill={GREEN} opacity={0.1 + i*0.02}
      />
    )))}

    {/* Floating dots top right */}
    {[0,1,2].map(i => [0,1,2].map(j => (
      <Circle key={`r${i}-${j}`}
        cx={W * 0.78 + i * 16} cy={H * 0.01 + j * 16}
        r={1.8} fill={ORANGE} opacity={0.12}
      />
    )))}

    {/* Leaf accent shapes */}
    <Path d={`M${W*0.05},${H*0.22} Q${W*0.08},${H*0.16} ${W*0.13},${H*0.2} Q${W*0.08},${H*0.24} ${W*0.05},${H*0.22} Z`}
      fill={GREEN} opacity="0.15" />
    <Path d={`M${W*0.86},${H*0.06} Q${W*0.9},${H*0.02} ${W*0.94},${H*0.06} Q${W*0.9},${H*0.1} ${W*0.86},${H*0.06} Z`}
      fill={ORANGE} opacity="0.18" />
  </Svg>
);

/* ── Stat badge chip ─────────────────────────────────────── */
const StatChip = ({ icon, label, value, color: chipColor, style }) => (
  <View style={[chipStyles.chip, { borderColor: `${chipColor}25` }, style]}>
    <View style={[chipStyles.iconBox, { backgroundColor: `${chipColor}15` }]}>
      <Ionicons name={icon} size={14} color={chipColor} />
    </View>
    <View>
      <Text style={[chipStyles.val, { color: chipColor }]}>{value}</Text>
      <Text style={chipStyles.lbl}>{label}</Text>
    </View>
  </View>
);

const chipStyles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  iconBox: {
    width: 28, height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  val: {
    // fontSize: 13,
    // fontWeight: '700',
    ...globalStyles.f12Bold,
    lineHeight: 16,
  },
  lbl: {
    // fontSize: 10,
    // fontWeight: '400',
    color: '#999',
    ...globalStyles.f8Regular,
  },
});

/* ── Step indicator ──────────────────────────────────────── */
const StepDots = ({ step }) => (
  <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center', marginBottom: 20 }}>
    {[0, 1].map(i => (
      <View key={i} style={{
        width: i === step ? 20 : 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: i === step ? GREEN : '#e0e0e0',
      }} />
    ))}
  </View>
);

/* ── Main Screen ─────────────────────────────────────────── */
export default function LoginScreen() {
  const navigation = useNavigation();
  const { tx } = useTranslation();

  const [showOtp, setShowOtp]     = useState(false);
  const [mobile, setMobile]       = useState('');
  const [otp, setOtp]             = useState('');
  const [timer, setTimer]         = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [mobileError, setMobileError] = useState('');

  const otpRef    = useRef(null);
  const cardSlide = useSharedValue(400);
  const cardOp    = useSharedValue(0);

  useEffect(() => {
    cardSlide.value = withSpring(0, { damping: 18, stiffness: 120 });
    cardOp.value    = withTiming(1, { duration: 600 });
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: cardSlide.value }],
    opacity: cardOp.value,
  }));

  // Auto focus OTP input
  useEffect(() => {
    if (showOtp) setTimeout(() => otpRef.current?.focus(), 300);
  }, [showOtp]);

  // OTP countdown timer
  useEffect(() => {
    let interval;
    if (showOtp && timer > 0) {
      interval = setInterval(() => setTimer(p => p - 1), 1000);
    } else if (timer === 0 && showOtp) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, showOtp]);

  const handleSendOtp = () => {
    if (mobile.length !== 10) {
      setMobileError('Please enter a valid 10-digit mobile number');
      return;
    }
    setMobileError('');
    setShowOtp(true);
    setTimer(30);
    setCanResend(false);
  };

  const handleResendOtp = () => {
    setOtp('');
    setTimer(30);
    setCanResend(false);
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      navigation.replace('KycSetup');
    } else {
      alert(tx('Please enter all 6 digits of OTP'));
    }
  };

  const renderOtpBoxes = () => (
    <View style={styles.otpContainer}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => otpRef.current?.focus()}
        style={styles.otpRow}
      >
        {[0,1,2,3,4,5].map((_, i) => {
          const isActive  = i === otp.length;
          const isFilled  = i < otp.length;
          return (
            <View key={i} style={[
              styles.otpBox,
              isActive && styles.otpBoxActive,
              isFilled && styles.otpBoxFilled,
            ]}>
              <Text style={[styles.otpChar, isFilled && { color: GREEN }]}>
                {otp[i] || ''}
              </Text>
              {isActive && <View style={styles.cursor} />}
            </View>
          );
        })}
      </TouchableOpacity>
      <TextInput
        ref={otpRef}
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        maxLength={6}
        style={styles.hiddenInput}
        pointerEvents="none"
      />
    </View>
  );

  return (
    <View style={styles.root}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* Top decorative illustration */}
      <TopIllustration />

      {/* Logo + brand in illustration area */}
      <Animated.View
        entering={FadeIn.delay(200).duration(700)}
        style={styles.topBrand}
      >
        <View style={styles.logoWrap}>
          <Image source={KSLogo} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={styles.brandRow}>
          <Text style={styles.brandGreen}>Kisan</Text>
          <Text style={styles.brandOrange}> Sahakar</Text>
        </View>
        <Text style={styles.brandTag}>Smart Equipment. Stronger Farms.</Text>

        {/* Stat chips */}
        <View style={styles.statsRow}>
          <StatChip icon="people-outline"   label="Gig Workers"  value="50K+"  color={GREEN}  />
          <StatChip icon="construct-outline" label="Equipment"    value="200+"  color={ORANGE} />
          <StatChip icon="location-outline" label="Districts"    value="120+"  color={GREEN}  />
        </View>
      </Animated.View>

      {/* Bottom form card */}
      <KeyboardAvoidingView
        style={styles.kavWrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={[styles.card, cardStyle]}>

            {/* Card top accent bar */}
            <View style={styles.cardTopBar}>
              <View style={[styles.cardBarDot, { backgroundColor: GREEN }]} />
              <View style={[styles.cardBarDot, { backgroundColor: ORANGE }]} />
              <View style={[styles.cardBarDot, { backgroundColor: `${GREEN}60` }]} />
            </View>

            {/* Step dots */}
            <StepDots step={showOtp ? 1 : 0} />

            {/* Heading */}
            <View style={styles.headingRow}>
              <View style={styles.lockBadge}>
                <Ionicons name="shield-checkmark-outline" size={15} color={GREEN} />
                <Text style={styles.lockText}>SECURE LOGIN</Text>
              </View>
            </View>

            <Text style={styles.title}>
              {showOtp ? 'Enter OTP 🔐' : 'Welcome Back 👋'}
            </Text>
            <Text style={styles.subtitle}>
              {showOtp
                ? `OTP sent to +91 ${mobile}. Check your messages.`
                : "We'll send a one-time code to your registered mobile number."}
            </Text>

            {/* ── Mobile input ── */}
            {!showOtp && (
              <>
                <Text style={styles.label}>{tx('Mobile Number')}</Text>
                <View style={[styles.inputWrap, mobileError ? styles.inputError : null]}>
                  {/* Country flag + code */}
                  <View style={styles.prefixBox}>
                    <Text style={styles.flag}>🇮🇳</Text>
                    <Text style={styles.prefix}>+91</Text>
                    <View style={styles.prefixDiv} />
                  </View>
                  <TextInput
                    placeholder="Enter mobile number"
                    placeholderTextColor="#bbb"
                    style={styles.input}
                    keyboardType="number-pad"
                    value={mobile}
                    onChangeText={(t) => { setMobile(t); setMobileError(''); }}
                    maxLength={10}
                  />
                  {mobile.length === 10 && (
                    <View style={styles.inputCheck}>
                      <Ionicons name="checkmark-circle" size={20} color={GREEN} />
                    </View>
                  )}
                </View>
                {mobileError ? (
                  <Animated.View entering={FadeIn} style={styles.errorRow}>
                    <Ionicons name="alert-circle-outline" size={13} color="#e53935" />
                    <Text style={styles.errorText}>{mobileError}</Text>
                  </Animated.View>
                ) : null}

                {/* Info note */}
                <View style={styles.infoNote}>
                  <Ionicons name="information-circle-outline" size={13} color={GREEN} />
                  <Text style={styles.infoText}>OTP will be sent via SMS to this number</Text>
                </View>
              </>
            )}

            {/* ── OTP boxes ── */}
            {showOtp && (
              <Animated.View entering={FadeIn.duration(400)} layout={Layout.springify()}>
                <Text style={styles.label}>{tx('Enter 6-digit OTP')}</Text>
                {renderOtpBoxes()}

                {/* Resend row */}
                <View style={styles.resendRow}>
                  <Ionicons name="time-outline" size={14} color="#aaa" />
                  <Text style={styles.resendText}>{tx("Didn't receive OTP?  ")}</Text>
                  <TouchableOpacity onPress={handleResendOtp} disabled={!canResend} activeOpacity={0.7}>
                    <Text style={[styles.resendLink, { color: canResend ? GREEN : '#ccc' }]}>
                      {canResend
                        ? tx('Resend OTP')
                        : tx('Resend in {{seconds}}s', { seconds: timer })}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Change number */}
                <TouchableOpacity
                  onPress={() => { setShowOtp(false); setOtp(''); }}
                  style={styles.changeNumRow}
                  activeOpacity={0.7}
                >
                  <Ionicons name="pencil-outline" size={13} color={ORANGE} />
                  <Text style={styles.changeNumText}>Change number  +91 {mobile}</Text>
                </TouchableOpacity>
              </Animated.View>
            )}

            {/* ── CTA Button ── */}
            <TouchableOpacity
              style={[
                styles.ctaBtn,
                showOtp && otp.length < 6 && styles.ctaBtnDisabled,
              ]}
              activeOpacity={0.82}
              onPress={showOtp ? handleVerifyOtp : handleSendOtp}
            >
              <View style={styles.ctaBtnInner}>
                <Text style={styles.ctaText}>
                  {showOtp ? tx('Verify & Continue') : tx('Send OTP')}
                </Text>
                <View style={styles.ctaArrow}>
                  <Ionicons name="arrow-forward" size={18} color={GREEN} />
                </View>
              </View>
            </TouchableOpacity>

            {/* Terms */}
            <Text style={styles.terms}>
              By continuing you agree to our{' '}
              <Text style={{ color: GREEN, fontWeight: '600' }}>Terms of Service</Text>
              {' & '}
              <Text style={{ color: GREEN, fontWeight: '600' }}>Privacy Policy</Text>
            </Text>

          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

/* ─── Styles ────────────────────────────────────────────── */
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },

  /* Top brand section */
  topBrand: {
    position: 'absolute',
    top: H * 0.07,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  logoWrap: {
    width: 76,
    height: 76,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: GREEN,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: `${GREEN}18`,
  },
  logo: {
    width: 62,
    height: 62,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 3,
  },
  brandGreen: {
    // fontSize: 22,
    // fontWeight: '800',
    ...globalStyles.f24ExtraBold,
    color: GREEN,
    letterSpacing: 0.3,
  },
  brandOrange: {
    // fontSize: 22,
    // fontWeight: '800',
    ...globalStyles.f24ExtraBold,
    color: ORANGE,
    letterSpacing: 0.3,
  },
  brandTag: {
    // fontSize: 11,
    ...globalStyles.f10Regular,
    color: '#888',
    letterSpacing: 0.5,
    marginBottom: 14,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },

  /* KAV wrapper */
  kavWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  /* Form card */
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: Platform.OS === 'ios' ? 40 : 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.07,
    shadowRadius: 20,
    elevation: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
  },
  cardTopBar: {
    flexDirection: 'row',
    gap: 5,
    alignSelf: 'center',
    marginBottom: 14,
  },
  cardBarDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  /* Lock badge */
  headingRow: {
    marginBottom: 10,
  },
  lockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: LIGHT_GREEN,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 5,
    borderWidth: 1,
    borderColor: `${GREEN}20`,
  },
  lockText: {
    // fontSize: 11,
    // fontWeight: '700',
    ...globalStyles.f10Bold,
    color: GREEN,
    letterSpacing: 1,
  },

  title: {
    // fontSize: 24,
    // fontWeight: '800',
    ...globalStyles.f24ExtraBold,
    color: '#1a1a1a',
    marginBottom: 5,
    letterSpacing: 0.2,
  },
  subtitle: {
    // fontSize: 13,
    // color: '#999',
    ...globalStyles.f12Regular,
    marginBottom: 22,
    lineHeight: 19,
    letterSpacing: 0.1,
  },

  label: {
    // fontSize: 13,
    // fontWeight: '600',
    ...globalStyles.f12SemiBold,
    color: '#444',
    marginBottom: 8,
    letterSpacing: 0.2,
  },

  /* Mobile input */
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SURFACE,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: BORDER,
    overflow: 'hidden',
    marginBottom: 6,
  },
  inputError: {
    borderColor: '#e53935',
  },
  prefixBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 16,
    gap: 4,
  },
  flag: {
    // fontSize: 16,
    ...globalStyles.f14Medium,
  },
  prefix: {
    // fontSize: 15,
    // fontWeight: '700',
    ...globalStyles.f14Bold,
    color: '#444',
  },
  prefixDiv: {
    width: 1,
    height: 20,
    backgroundColor: BORDER,
    marginLeft: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 17,
    paddingRight: 14,
    color: '#1a1a1a',
    // fontSize: 16,
    // fontWeight: '500',
    ...globalStyles.f16Medium,
    letterSpacing: 1,
  },
  inputCheck: {
    paddingRight: 14,
  },

  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  errorText: {
    // fontSize: 12,
    ...globalStyles.f10Regular,
    color: '#e53935',
  },

  infoNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: LIGHT_GREEN,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginTop: 4,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: `${GREEN}18`,
  },
  infoText: {
    // fontSize: 12,
    // fontWeight: '500',
    ...globalStyles.f10Medium,
    color: GREEN,
  },

  /* OTP boxes */
  otpContainer: {
    position: 'relative',
    marginBottom: 6,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 8,
    gap: 8,
  },
  otpBox: {
    flex: 1,
    height: 58,
    borderRadius: 14,
    backgroundColor: SURFACE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: BORDER,
    position: 'relative',
  },
  otpBoxActive: {
    borderColor: GREEN,
    borderWidth: 2,
    backgroundColor: '#f1f8f1',
  },
  otpBoxFilled: {
    backgroundColor: LIGHT_GREEN,
    borderColor: `${GREEN}50`,
  },
  otpChar: {
    // fontSize: 22,
    // fontWeight: '700',
    ...globalStyles.f20Bold,
    color: '#1a1a1a',
  },
  cursor: {
    position: 'absolute',
    bottom: 10,
    width: 2,
    height: 20,
    backgroundColor: GREEN,
    borderRadius: 1,
  },
  hiddenInput: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
  },

  /* Resend */
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    marginBottom: 6,
    gap: 3,
  },
  resendText: {
    // fontSize: 13,
    // color: '#aaa',
    ...globalStyles.f12Regular,
  },
  resendLink: {
    // fontSize: 13,
    // fontWeight: '700',
    ...globalStyles.f12Bold,
    textDecorationLine: 'underline',
  },

  changeNumRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginBottom: 4,
  },
  changeNumText: {
    // fontSize: 12,
    // color: ORANGE,
    // fontWeight: '600',
    ...globalStyles.f12SemiBold,
    color: ORANGE,
  },

  /* CTA button */
  ctaBtn: {
    backgroundColor: GREEN,
    borderRadius: 16,
    marginTop: 20,
    marginBottom: 14,
    shadowColor: GREEN,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 7,
  },
  ctaBtnDisabled: {
    opacity: 0.5,
  },
  ctaBtnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 10,
  },
  ctaText: {
    color: '#fff',
    // fontSize: 16,
    // fontWeight: '700',
    ...globalStyles.f16Bold,
    letterSpacing: 0.3,
  },
  ctaArrow: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  terms: {
    // fontSize: 11,
    ...globalStyles.f10Regular,
    color: '#bbb',
    textAlign: 'center',
    lineHeight: 17,
    letterSpacing: 0.1,
  },
});