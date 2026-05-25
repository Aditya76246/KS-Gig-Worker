import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
    Animated,
    Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import CustomText from "./CustomText";
import globalStyles from "../../styles/globalStyles";
import { color } from "../../styles/theme";
import { useTranslation } from "../../localization/i18n";

export const notificationItems = [
    {
        id: "nearby-paddy",
        type: "job",
        title: "Paddy harvest request",
        body: "Ramesh Patil needs 6 workers for harvest cutting near Hulikeri.",
        meta: "2.4 km - Rs 850/day",
        time: "Now",
        unread: true,
        icon: "briefcase",
        tone: "green",
        action: "View Job",
    },
    {
        id: "packing-fpo",
        type: "group",
        title: "Group packing work",
        body: "Green Valley FPO opened a 12 worker sorting and packing shift.",
        meta: "Tomorrow 9:00 AM - Rs 110/hour",
        time: "8 min",
        unread: true,
        icon: "account-group",
        tone: "amber",
        action: "Accept",
    },
    {
        id: "kyc",
        type: "kyc",
        title: "KYC verification pending",
        body: "Your Aadhaar, bank passbook and profile photo are waiting for FPO verification.",
        meta: "Profile status",
        time: "Today",
        unread: false,
        icon: "shield-check",
        tone: "teal",
        action: "Check",
    },
    {
        id: "wallet",
        type: "wallet",
        title: "Payment received",
        body: "Cash payment was recorded for tomato loading work.",
        meta: "Confirmed earnings + Rs 970",
        time: "Yesterday",
        unread: false,
        icon: "wallet",
        tone: "green",
        action: "Wallet",
    },
    {
        id: "offline",
        type: "sync",
        title: "Offline punch synced",
        body: "Your punch-in and punch-out records were synced after network returned.",
        meta: "Booking ID JOB-1842",
        time: "2 days",
        unread: false,
        icon: "cloud-sync",
        tone: "blue",
        action: "Details",
    },
];

export function getUnreadNotificationCount(items = notificationItems) {
    return items.filter((item) => item.unread).length;
}

export default function Notifications({
    visible,
    onClose,
    items = notificationItems,
}) {
    const insets = useSafeAreaInsets();
    const { tx } = useTranslation();
    const [activeFilter, setActiveFilter] = useState("All");

    const unreadCount = getUnreadNotificationCount(items);
    const filters = ["All", "Jobs", "Wallet", "KYC"];
    const slideAnim = useRef(new Animated.Value(700)).current;
    const backdropOpacity = slideAnim.interpolate({
        inputRange: [0, 700],
        outputRange: [1, 0],
    });
    const [modalVisible, setModalVisible] = useState(visible);
    const filteredItems = useMemo(() => {
        if (activeFilter === "All") {
            return items;
        }

        const filterMap = {
            Jobs: ["job", "group"],
            Wallet: ["wallet"],
            KYC: ["kyc", "sync"],
        };

        return items.filter((item) => filterMap[activeFilter]?.includes(item.type));
    }, [activeFilter, items]);

    useEffect(() => {
        if (visible) {
            setModalVisible(true);

            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 380,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: 700,
                duration: 380,
                easing: Easing.in(Easing.cubic),
                useNativeDriver: true,
            }).start(() => {
                setModalVisible(false);
            });
        }
    }, [visible]);

    return (
        <Modal
            animationType="none"
            transparent
            visible={modalVisible}
            statusBarTranslucent
            onRequestClose={onClose}
        >
            <View style={styles.modalRoot}>
                <Pressable style={styles.backdrop} onPress={onClose} />

                <Animated.View
                    style={[
                        styles.sheet,
                        { paddingBottom: Math.max(insets.bottom, 14), transform: [{ translateY: slideAnim }] },
                    ]}
                >
                    <LinearGradient
                        colors={["#082F1B", "#116834", "#2F8C44"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.header}
                    >
                        <View style={[globalStyles.flexrow, globalStyles.justifysb, globalStyles.alineItemscenter]}>
                            <View style={styles.headerCopy}>
                                <CustomText style={styles.eyebrow}>{tx("Worker alerts")}</CustomText>
                                <CustomText style={styles.title}>{tx("Notifications")}</CustomText>
                                <CustomText style={styles.subtitle} numberOfLines={2}>
                                    {tx("Nearby jobs, wallet and profile updates in one place.")}
                                </CustomText>
                            </View>

                            <Pressable
                                accessibilityRole="button"
                                accessibilityLabel={tx("Close notifications")}
                                onPress={onClose}
                                style={styles.closeButton}
                            >
                                <Ionicons name="close" size={20} color="#FFFFFF" />
                            </Pressable>
                        </View>

                        <View style={styles.headerStats}>
                            <HeaderStat icon="notifications" value={items.length} label={tx("Total")} />
                            <HeaderStat icon="flash" value={unreadCount} label={tx("New")} />
                            <HeaderStat icon="location" value="5 km" label={tx("Range")} />
                        </View>
                    </LinearGradient>

                    {/* <View style={styles.filterRow}>
                        {filters.map((filter) => (
                            <Pressable
                                key={filter}
                                onPress={() => setActiveFilter(filter)}
                                style={[
                                    styles.filterChip,
                                    activeFilter === filter && styles.filterChipActive,
                                ]}
                            >
                                <CustomText
                                    style={[
                                        styles.filterText,
                                        activeFilter === filter && styles.filterTextActive,
                                    ]}
                                >
                                    {tx(filter)}
                                </CustomText>
                            </Pressable>
                        ))}
                    </View> */}

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                    >
                        {filteredItems.map((item) => (
                            <NotificationCard key={item.id} item={item} tx={tx} />
                        ))}
                    </ScrollView>
                </Animated.View>
            </View>
        </Modal>
    );
}

function HeaderStat({ icon, value, label }) {
    return (
        <View style={styles.statPill}>
            <Ionicons name={icon} size={14} color="#FBBF24" />
            <CustomText style={styles.statValue}>{value}</CustomText>
            <CustomText style={styles.statLabel}>{label}</CustomText>
        </View>
    );
}

function NotificationCard({ item, tx }) {
    const tone = toneStyles[item.tone] || toneStyles.green;

    return (
        <Pressable style={[styles.card, item.unread && styles.cardUnread]}>
            <View style={[styles.iconWrap, { backgroundColor: tone.bg }]}>
                <MaterialCommunityIcons name={item.icon} size={21} color={tone.icon} />
            </View>

            <View style={styles.cardBody}>
                <View style={styles.cardTop}>
                    <CustomText style={styles.cardTitle} numberOfLines={1}>
                        {tx(item.title)}
                    </CustomText>
                    <CustomText style={styles.timeText}>{tx(item.time)}</CustomText>
                </View>

                <CustomText style={styles.cardText} numberOfLines={2}>
                    {tx(item.body)}
                </CustomText>

                <View style={styles.cardBottom}>
                    <View style={styles.metaPill}>
                        <Ionicons name="information-circle" size={13} color="#356246" />
                        <CustomText style={styles.metaText} numberOfLines={1}>
                            {tx(item.meta)}
                        </CustomText>
                    </View>

                    <View style={styles.actionPill}>
                        <CustomText style={styles.actionText}>{tx(item.action)}</CustomText>
                        <Ionicons name="chevron-forward" size={13} color="#15803D" />
                    </View>
                </View>
            </View>

            {item.unread && <View style={styles.unreadDot} />}
        </Pressable>
    );
}

const toneStyles = {
    green: { bg: "#E9FBEF", icon: "#15803D" },
    amber: { bg: "#FFF7E0", icon: "#D97706" },
    teal: { bg: "#E6F7F7", icon: "#25878F" },
    blue: { bg: "#EAF2FF", icon: "#2563EB" },
};

const styles = StyleSheet.create({
    modalRoot: {
        flex: 1,
        justifyContent: "flex-end",
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: color.overlayStrong,
    },
    sheet: {
        maxHeight: "88%",
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        backgroundColor: "#F4FAF2",
        overflow: "hidden",
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 18,
        paddingBottom: 16,
    },
    headerCopy: {
        flex: 1,
        paddingRight: 14,
    },
    eyebrow: {
        color: "#BBF7D0",
        fontSize: 11,
        fontWeight: "900",
        textTransform: "uppercase",
    },
    title: {
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: "900",
        marginTop: 3,
    },
    subtitle: {
        color: "#DDFBE5",
        fontSize: 12,
        lineHeight: 17,
        fontWeight: "700",
        marginTop: 5,
    },
    closeButton: {
        width: 38,
        height: 38,
        borderRadius: 19,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.2)",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.1)",
    },
    headerStats: {
        flexDirection: "row",
        gap: 8,
        marginTop: 15,
    },
    statPill: {
        flex: 1,
        minHeight: 42,
        borderRadius: 14,
        backgroundColor: "rgba(255,255,255,0.13)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.16)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
    },
    statValue: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "900",
    },
    statLabel: {
        color: "#DCFCE7",
        fontSize: 10,
        fontWeight: "800",
    },
    filterRow: {
        flexDirection: "row",
        gap: 8,
        paddingHorizontal: 20,
        paddingTop: 14,
    },
    filterChip: {
        minHeight: 34,
        paddingHorizontal: 13,
        borderRadius: 999,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#DCEBDD",
        alignItems: "center",
        justifyContent: "center",
    },
    filterChipActive: {
        backgroundColor: "#12351F",
        borderColor: "#12351F",
    },
    filterText: {
        color: "#4D6656",
        fontSize: 12,
        fontWeight: "900",
    },
    filterTextActive: {
        color: "#FFFFFF",
    },
    listContent: {
        padding: 20,
        paddingTop: 14,
        gap: 12,
    },
    card: {
        minHeight: 116,
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#DCEBDD",
        padding: 13,
        flexDirection: "row",
        gap: 12,
        shadowColor: "#08341E",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 3,
    },
    cardUnread: {
        borderColor: "#B7E1C1",
        backgroundColor: "#FEFFFE",
    },
    iconWrap: {
        width: 42,
        height: 42,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
    },
    cardBody: {
        flex: 1,
    },
    cardTop: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    cardTitle: {
        flex: 1,
        color: "#12351F",
        fontSize: 15,
        fontWeight: "900",
    },
    timeText: {
        color: "#7B8A80",
        fontSize: 10,
        fontWeight: "900",
    },
    cardText: {
        color: "#4D6656",
        fontSize: 12,
        lineHeight: 17,
        fontWeight: "700",
        marginTop: 5,
    },
    cardBottom: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        marginTop: 11,
    },
    metaPill: {
        flex: 1,
        minHeight: 28,
        borderRadius: 999,
        backgroundColor: "#F1F7F0",
        paddingHorizontal: 9,
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    metaText: {
        flex: 1,
        color: "#356246",
        fontSize: 10,
        fontWeight: "800",
    },
    actionPill: {
        minHeight: 28,
        borderRadius: 999,
        backgroundColor: "#E9FBEF",
        paddingHorizontal: 9,
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },
    actionText: {
        color: "#15803D",
        fontSize: 10,
        fontWeight: "900",
    },
    unreadDot: {
        position: "absolute",
        top: 13,
        right: 13,
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: "#EF4444",
    },
});


