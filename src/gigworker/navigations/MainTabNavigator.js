import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  DeviceEventEmitter,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import CustomHeader from '../components/CustomHeader';
import CustomText from '../components/CustomText';
import globalStyles from '../../styles/globalStyles';

import HomeStackNavigator from './HomeStackNavigator';
import BookingsStackNavigator from './BookingsStackNavigator';
import EarningsStackNavigator from './EarningsStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import { useTranslation } from '../../localization/i18n';

const Tab = createBottomTabNavigator();

const TAB_CONFIG = [
  { name: 'HomeTab', labelKey: 'tabs.home', icon: 'home', iconOutline: 'home-outline' },
  { name: 'BookingsTab', labelKey: 'tabs.jobs', icon: 'briefcase', iconOutline: 'briefcase-outline' },
  { name: 'EarningsTab', labelKey: 'tabs.wallet', icon: 'wallet', iconOutline: 'wallet-outline' },
  { name: 'ProfileTab', labelKey: 'tabs.profile', icon: 'person', iconOutline: 'person-outline' },
];

const TAB_ROOT_ROUTES = {
  HomeTab: 'HomeMain',
  BookingsTab: 'BookingsMain',
  EarningsTab: 'EarningsMain',
  ProfileTab: 'ProfileMain',
};

function isInnerStackScreen(route) {
  const rootRouteName = TAB_ROOT_ROUTES[route.name];
  const focusedRouteName = getFocusedRouteNameFromRoute(route);

  return Boolean(focusedRouteName && focusedRouteName !== rootRouteName);
}

// ─── Animated Tab Button ──────────────────────────────────────────────────────

function TabButton({ tab, isFocused, onPress, onLongPress }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bgAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: isFocused ? 1.12 : 1,
        useNativeDriver: true,
        friction: 6,
        tension: 120,
      }),
      Animated.timing(bgAnim, {
        toValue: isFocused ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.spring(translateY, {
        toValue: isFocused ? -6 : 0,
        useNativeDriver: true,
        friction: 7,
        tension: 130,
      }),
    ]).start();
  }, [isFocused]);

  const bgColor = bgAnim.interpolate({ inputRange: [0, 1], outputRange: ['#f3f7ef', '#12733a'] });
  const iconColor = isFocused ? '#ffffff' : '#78927b';
  const iconName = isFocused ? tab.icon : tab.iconOutline;

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.8}
      style={[styles.tabButton, isFocused && styles.tabButtonActive]}
    >
      <Animated.View style={[styles.tabInner, { transform: [{ scale: scaleAnim }, { translateY }] }]}>
        <Animated.View style={[styles.iconPill, { backgroundColor: bgColor }]}>
          <Ionicons name={iconName} size={22} color={iconColor} />
        </Animated.View>
        <CustomText
          style={[
            styles.tabLabel,
            { color: isFocused ? '#0f6b34' : '#8ca18d' },
            isFocused && styles.tabLabelActive,
          ]}
        >
          {tab.label}
        </CustomText>
      </Animated.View>
    </TouchableOpacity>
  );
}

// ─── Custom Tab Bar ───────────────────────────────────────────────────────────

function CustomTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const hiddenAnim = useRef(new Animated.Value(0)).current;
  const isHiddenRef = useRef(false);
  const [tabBarHidden, setTabBarHidden] = useState(false);

  const focusedRoute = state.routes[state.index];
  const focusedDescriptor = descriptors[focusedRoute.key];
  const tabBarStyle = focusedDescriptor?.options?.tabBarStyle;

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener('ks:setTabBarHidden', (shouldHide) => {
      if (isHiddenRef.current === shouldHide) {
        return;
      }

      isHiddenRef.current = shouldHide;
      setTabBarHidden(shouldHide);
      Animated.timing(hiddenAnim, {
        toValue: shouldHide ? 1 : 0,
        duration: 230,
        useNativeDriver: true,
      }).start();
    });

    return () => subscription.remove();
  }, [hiddenAnim]);

  useEffect(() => {
    if (isHiddenRef.current) {
      isHiddenRef.current = false;
      setTabBarHidden(false);
      Animated.timing(hiddenAnim, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }).start();
    }
  }, [focusedRoute.name, hiddenAnim]);

  // Inner screens signal { display: 'none' } — honour it.
  if (isInnerStackScreen(focusedRoute) || tabBarStyle?.display === 'none') {
    return null;
  }

  return (
    <Animated.View
      pointerEvents={tabBarHidden ? 'none' : 'auto'}
      style={[
        styles.tabBarWrapper,
        {
          bottom: insets.bottom + 10,
          opacity: hiddenAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
          transform: [
            {
              translateY: hiddenAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 112 + insets.bottom],
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const tab = TAB_CONFIG.find((t) => t.name === route.name);
          if (!tab) return null;
          const translatedTab = { ...tab, label: t(tab.labelKey) };

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!event.defaultPrevented) {
              if (isFocused) {
                // Already on this tab — pop back to root screen of its stack
                navigation.navigate(route.name, {
                  screen: TAB_ROOT_ROUTES[route.name],
                });
              } else {
                navigation.navigate(route.name);
              }
            }
          };

          const onLongPress = () => {
            navigation.emit({ type: 'tabLongPress', target: route.key });
          };

          return (
            <TabButton
              key={route.key}
              tab={translatedTab}
              isFocused={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
            />
          );
        })}
      </View>
    </Animated.View>
  );
}

// ─── Main Navigator ───────────────────────────────────────────────────────────

export default function MainTabNavigator() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={({ route }) => ({
        // The CustomHeader is shown by default for every tab root.
        // Individual inner screens set tabBarStyle: { display: 'none' } which
        // also signals us to hide the header (we do that check below).
        header: ({ options }) => {
          if (route.name === 'HomeTab') {
            return null;
          }

          // Hide CustomHeader when inner screen requests tab bar hidden
          if (isInnerStackScreen(route) || options?.tabBarStyle?.display === 'none') {
            return null;
          }
          return <CustomHeader />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} options={{ title: t('tabs.home') }} />
      <Tab.Screen name="BookingsTab" component={BookingsStackNavigator} options={{ title: t('tabs.bookings') }} />
      <Tab.Screen name="EarningsTab" component={EarningsStackNavigator} options={{ title: t('tabs.earnings') }} />
      <Tab.Screen name="ProfileTab" component={ProfileStackNavigator} options={{ title: t('tabs.profile') }} />
    </Tab.Navigator>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  tabBarWrapper: {
    position: 'absolute',
    left: 18,
    right: 18,
    backgroundColor: 'transparent',
  },
  tabBar: {
    flexDirection: 'row',
    minHeight: 74,
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 9,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.98)',
    borderWidth: 1,
    borderColor: '#dfeade',
    shadowColor: '#08341E',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 18,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    borderRadius: 22,
  },
  tabButtonActive: {
    backgroundColor: '#f2fbf3',
  },
  tabInner: {
    alignItems: 'center',
    gap: 4,
  },
  iconPill: {
    width: 48,
    height: 34,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    ...globalStyles.f10Regular,
  },
  tabLabelActive: {
    ...globalStyles.f10Bold,
  },
});



