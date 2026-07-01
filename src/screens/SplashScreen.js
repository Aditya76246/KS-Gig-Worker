import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    StatusBar,
    Animated,
    Dimensions,
    Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import KSLogo from '../../assets/icons/icon2.png';
import CustomText from '../components/CustomText';
import { color } from '../styles/theme';
import globalStyles from '../styles/globalStyles';
import { useTranslation } from '../localization/i18n';

const { width: W, height: H } = Dimensions.get('window');

const GREEN = '#2e7d32';
const ORANGE = '#e07b00';
const LIGHT_GREEN = '#e8f5e9';
const LIGHT_ORANGE = '#fff3e0';

/* ── Dot grid decoration ────────────────────────────────── */
const DotGrid = () => {
    const cols = 8, rows = 5;
    const dots = [];
    const sx = (W * 0.88) / (cols - 1);
    const sy = 80 / (rows - 1);
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            dots.push(
                <Circle key={`${r}-${c}`}
                    cx={c * sx} cy={r * sy} r={2.4}
                    fill={GREEN} opacity={0.07 + (r + c) * 0.01}
                />
            );
        }
    }
    return (
        <Svg width={W * 0.88} height={80}
            style={{ position: 'absolute', top: 72, left: W * 0.06 }}>
            {dots}
        </Svg>
    );
};

/* ── Concentric rings behind logo ───────────────────────── */
const Rings = () => (
    <Svg width={300} height={300}
        style={{ position: 'absolute', top: H * 0.1, left: (W - 300) / 2 }}>
        <Circle cx="150" cy="150" r="145" stroke={GREEN} strokeWidth="1" fill="none" opacity="0.05" />
        <Circle cx="150" cy="150" r="120" stroke={GREEN} strokeWidth="1" fill="none" opacity="0.07" />
        <Circle cx="150" cy="150" r="95" stroke={GREEN} strokeWidth="1.5" fill="none" opacity="0.09" />
        <Circle cx="150" cy="150" r="70" stroke={ORANGE} strokeWidth="1" fill="none" opacity="0.08" />
    </Svg>
);

/* ── Soft wave between content and card ─────────────────── */
const Wave = () => (
    <Svg width={W} height={180}
        style={{ position: 'absolute', bottom: 170, left: 0 }}
        viewBox={`0 0 ${W} 180`}>
        <Defs>
            <LinearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor={LIGHT_GREEN} stopOpacity="0.95" />
                <Stop offset="100%" stopColor={LIGHT_GREEN} stopOpacity="0.2" />
            </LinearGradient>
        </Defs>
        <Path
            d={`M0,100 Q${W * 0.25},50 ${W * 0.5},88 Q${W * 0.75},126 ${W},72 L${W},180 L0,180 Z`}
            fill="url(#wg)"
        />
        <Path
            d={`M0,120 Q${W * 0.3},90 ${W * 0.55},115 Q${W * 0.78},138 ${W},105 L${W},180 L0,180 Z`}
            fill={LIGHT_GREEN} opacity="0.45"
        />
    </Svg>
);

/* ─── Main Component ────────────────────────────────────── */
export default function SplashScreen({ navigation }) {
    const { t } = useTranslation();
    const fadeIn = useRef(new Animated.Value(0)).current;
    const logoScale = useRef(new Animated.Value(0.72)).current;
    const logoY = useRef(new Animated.Value(28)).current;
    const chip1X = useRef(new Animated.Value(-50)).current;
    const chip2X = useRef(new Animated.Value(50)).current;
    const chipOp = useRef(new Animated.Value(0)).current;
    const cardY = useRef(new Animated.Value(70)).current;
    const cardOp = useRef(new Animated.Value(0)).current;
    const floatY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(fadeIn, { toValue: 1, duration: 650, useNativeDriver: true }),
                Animated.spring(logoScale, { toValue: 1, friction: 6, tension: 50, useNativeDriver: true }),
                Animated.timing(logoY, { toValue: 0, duration: 650, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
            ]),
            Animated.parallel([
                Animated.timing(chip1X, { toValue: 0, duration: 480, easing: Easing.out(Easing.back(1.4)), useNativeDriver: true }),
                Animated.timing(chip2X, { toValue: 0, duration: 480, easing: Easing.out(Easing.back(1.4)), useNativeDriver: true }),
                Animated.timing(chipOp, { toValue: 1, duration: 400, useNativeDriver: true }),
            ]),
            Animated.parallel([
                Animated.timing(cardY, { toValue: 0, duration: 520, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
                Animated.timing(cardOp, { toValue: 1, duration: 520, useNativeDriver: true }),
            ]),
        ]).start(() => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(floatY, { toValue: -9, duration: 2200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
                    Animated.timing(floatY, { toValue: 0, duration: 2200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
                ])
            ).start();
        });
    }, []);

    return (
        <View style={s.root}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

            {/* Corner accent blobs */}
            <View style={s.blobGreenTR} />
            <View style={s.blobOrangeTR} />
            <View style={s.blobGreenBL} />

            {/* Decorative SVG layers */}
            <Animated.View style={{ opacity: fadeIn }}>
                <DotGrid />
                <Rings />
                <Wave />
            </Animated.View>

            {/* ── Logo + Brand ─────────────────────────────── */}
            <Animated.View style={[
                s.brandWrap,
                {
                    opacity: fadeIn,
                    transform: [
                        { translateY: Animated.add(logoY, floatY) },
                        { scale: logoScale },
                    ],
                },
            ]}>
                {/* Logo card */}
                <View style={s.logoCard}>
                    <View style={s.logoInner}>
                        <Image source={KSLogo} style={s.logo} resizeMode="contain" />
                    </View>
                </View>

                {/* Brand name */}
                <View style={s.nameRow}>
                    <Text style={s.nameGreen}>Kisan</Text>
                    <Text style={s.nameOrange}> Sahakar</Text>
                </View>

                {/* Tagline */}
                <View style={s.tagRow}>
                    <View style={s.tagDash} />
                    <Text style={s.tagText}>{t('splash.subtitle')}</Text>
                    <View style={s.tagDash} />
                </View>
            </Animated.View>

            {/* ── Floating Chips ───────────────────────────── */}
            <Animated.View style={[s.chipsRow, { opacity: chipOp }]}>
                <Animated.View style={[s.chip, s.chipGreen, { transform: [{ translateX: chip1X }] }]}>
                    <Ionicons name="construct-outline" size={13} color={GREEN} />
                    <Text style={[s.chipText, { color: GREEN }]}>{t('splash.chipWorker')}</Text>
                </Animated.View>
                <Animated.View style={[s.chip, s.chipOrange, { transform: [{ translateX: chip2X }] }]}>
                    <Ionicons name="flash-outline" size={13} color={ORANGE} />
                    <Text style={[s.chipText, { color: ORANGE }]}>{t('splash.chipQuick')}</Text>
                </Animated.View>
            </Animated.View>

            {/* ── Bottom Action Card ───────────────────────── */}
            <Animated.View style={[s.card, { opacity: cardOp, transform: [{ translateY: cardY }] }]}>

                <View style={s.handle} />

                <Text style={s.cardTitle}>{t('splash.title')}</Text>
                <Text style={s.cardSub}>{t('splash.chooseAccount')}</Text>

                <View style={s.divider} />

                {/* Gig Worker Login */}
                <TouchableOpacity
                    style={s.btnGreen}
                    activeOpacity={0.82}
                    onPress={() => navigation.navigate('Login', { role: 'worker' })}
                >
                    <View style={s.btnIcon}>
                        <Ionicons name="people-outline" size={17} color={GREEN} />
                    </View>
                    <CustomText style={s.btnLabel}>{t('splash.gigWorkerLogin')}</CustomText>
                    <View style={s.btnChevron}>
                        <Ionicons name="chevron-forward" size={14} color="rgba(255,255,255,0.55)" />
                    </View>
                </TouchableOpacity>

                {/* Driver Login */}
                <TouchableOpacity
                    style={s.btnOrange}
                    activeOpacity={0.82}
                    onPress={() => navigation.navigate('Login', { role: 'driver' })}
                >
                    <View style={s.btnIcon}>
                        <Ionicons name="car-outline" size={17} color={ORANGE} />
                    </View>
                    <CustomText style={s.btnLabel}>{t('splash.driverLogin')}</CustomText>
                    <View style={s.btnChevron}>
                        <Ionicons name="chevron-forward" size={14} color="rgba(255,255,255,0.55)" />
                    </View>
                </TouchableOpacity>
                {/* Language Selection */}
                <TouchableOpacity
                    style={s.btnLanguage}
                    activeOpacity={0.82}
                    onPress={() => navigation.navigate('ChooseLanguage', { returnToProfile: true })}
                >
                    <View style={s.btnLanguageIcon}>
                        <Ionicons name="globe-outline" size={17} color={GREEN} />
                    </View>
                    <CustomText style={s.btnLanguageLabel}>{t('common.chooseLanguage')}</CustomText>
                    <View style={s.btnLanguageChevron}>
                        <Ionicons name="chevron-forward" size={14} color={GREEN} />
                    </View>
                </TouchableOpacity>
                <View style={s.footerRow}>
                    <View style={s.footerDot} />
                    <Text style={s.footerText}>{t('splash.footer')}</Text>
                    <View style={s.footerDot} />
                </View>
            </Animated.View>
        </View>
    );
}

/* ─── StyleSheet ─────────────────────────────────────────── */
const s = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#ffffff',
    },

    /* Corner blobs */
    blobGreenTR: {
        position: 'absolute', top: -70, right: -70,
        width: 210, height: 210, borderRadius: 105,
        backgroundColor: LIGHT_GREEN, opacity: 0.85,
    },
    blobOrangeTR: {
        position: 'absolute', top: -20, right: 80,
        width: 90, height: 90, borderRadius: 45,
        backgroundColor: LIGHT_ORANGE, opacity: 0.75,
    },
    blobGreenBL: {
        position: 'absolute', bottom: 140, left: -50,
        width: 140, height: 140, borderRadius: 70,
        backgroundColor: LIGHT_GREEN, opacity: 0.55,
    },

    /* Brand */
    brandWrap: {
        position: 'absolute',
        top: H * 0.13,
        left: 0, right: 0,
        alignItems: 'center',
    },
    logoCard: {
        width: 148,
        height: 148,
        borderRadius: 38,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: GREEN,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.16,
        shadowRadius: 28,
        elevation: 14,
        marginBottom: 22,
        borderWidth: 1,
        borderColor: `${GREEN}18`,
    },
    logoInner: {
        width: 126,
        height: 126,
        borderRadius: 32,
        backgroundColor: '#f6fbf6',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: `${GREEN}15`,
    },
    logo: {
        width: 108,
        height: 108,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 10,
    },
    nameGreen: {
        // fontSize: 34,
        // fontWeight: '800',
        ...globalStyles.f32ExtraBold,
        color: GREEN,
        letterSpacing: 0.4,
    },
    nameOrange: {
        // fontSize: 34,
        // fontWeight: '800',
        ...globalStyles.f32ExtraBold,
        color: ORANGE,
        letterSpacing: 0.4,
    },
    tagRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    tagDash: {
        width: 22,
        height: 1.5,
        backgroundColor: `${GREEN}35`,
        borderRadius: 1,
    },
    tagText: {
        // fontSize: 13,
        ...globalStyles.f12Regular,
        color: '#777',
        letterSpacing: 0.5,
    },

    /* Chips */
    chipsRow: {
        position: 'absolute',
        top: H * 0.45,
        left: 0, right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        paddingHorizontal: 13,
        paddingVertical: 7,
        borderWidth: 1,
        gap: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 5,
        elevation: 2,
    },
    chipGreen: {
        backgroundColor: LIGHT_GREEN,
        borderColor: `${GREEN}25`,
    },
    chipOrange: {
        backgroundColor: LIGHT_ORANGE,
        borderColor: `${ORANGE}25`,
    },
    chipText: {
        // fontSize: 11.5,
        // fontWeight: '600',
        ...globalStyles.f12SemiBold,
        letterSpacing: 0.3,
    },

    /* Card */
    card: {
        position: 'absolute',
        bottom: W >= 768 ? 34 : 0,
        left: W >= 768 ? (W - 440) / 2 : 0,
        right: W >= 768 ? undefined : 0,
        width: W >= 768 ? 440 : undefined,
        backgroundColor: '#fff',
        borderTopLeftRadius: 34,
        borderTopRightRadius: 34,
        borderBottomLeftRadius: W >= 768 ? 34 : 0,
        borderBottomRightRadius: W >= 768 ? 34 : 0,
        paddingHorizontal: 26,
        paddingBottom: 38,
        paddingTop: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.07,
        shadowRadius: 18,
        elevation: 14,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.04)',
    },
    handle: {
        width: 38, height: 4,
        borderRadius: 2,
        backgroundColor: '#e5e5e5',
        alignSelf: 'center',
        marginBottom: 20,
    },
    cardTitle: {
        // fontSize: 21,
        // fontWeight: '700',
        ...globalStyles.f20ExtraBold,
        color: '#1a1a1a',
        marginBottom: 4,
    },
    cardSub: {
        // fontSize: 13,
        ...globalStyles.f12Regular,
        color: '#aaa',
        marginBottom: 18,
        letterSpacing: 0.2,
    },
    divider: {
        height: 1,
        backgroundColor: '#f2f2f2',
        marginBottom: 18,
    },

    /* Buttons */
    btnGreen: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: GREEN,
        borderRadius: 16,
        paddingVertical: 13,
        paddingHorizontal: 14,
        marginBottom: 11,
        shadowColor: GREEN,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.32,
        shadowRadius: 14,
        elevation: 6,
    },
    btnOrange: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: ORANGE,
        borderRadius: 16,
        paddingVertical: 13,
        paddingHorizontal: 14,
        marginBottom: 11,
        shadowColor: ORANGE,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.32,
        shadowRadius: 14,
        elevation: 6,
    },
    btnLanguage: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingVertical: 13,
        paddingHorizontal: 14,
        marginBottom: 22,
        borderWidth: 1,
        borderColor: `${GREEN}25`,
    },
    btnIcon: {
        width: 34, height: 34,
        borderRadius: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    btnLanguageIcon: {
        width: 34, height: 34,
        borderRadius: 10,
        backgroundColor: LIGHT_GREEN,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    btnLabel: {
        flex: 1,
        color: '#fff',
        // fontSize: 15,
        // fontWeight: '600',
        ...globalStyles.f14SemiBold,
        letterSpacing: 0.2,
    },
    btnLanguageLabel: {
        flex: 1,
        color: GREEN,
        ...globalStyles.f14SemiBold,
        letterSpacing: 0.2,
    },
    btnChevron: {
        width: 26, height: 26,
        borderRadius: 7,
        backgroundColor: 'rgba(255,255,255,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnLanguageChevron: {
        width: 26, height: 26,
        borderRadius: 7,
        backgroundColor: LIGHT_GREEN,
        alignItems: 'center',
        justifyContent: 'center',
    },

    /* Footer */
    footerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    footerDot: {
        width: 4, height: 4,
        borderRadius: 2,
        backgroundColor: '#d0d0d0',
    },
    footerText: {
        // fontSize: 12,
        ...globalStyles.f12Regular,
        color: '#c0c0c0',
        letterSpacing: 0.35,
    },
});

