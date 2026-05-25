import { useCallback, useEffect, useRef, useState } from 'react';
import { DeviceEventEmitter } from 'react-native';

export default function useHideTabBarOnScroll() {
  const lastScrollY = useRef(0);
  const tabBarHidden = useRef(false);
  const [bottomNavHidden, setBottomNavHidden] = useState(false);

  useEffect(() => () => {
    DeviceEventEmitter.emit('ks:setTabBarHidden', false);
  }, []);

  const handleScroll = useCallback((event) => {
    const nextY = event.nativeEvent.contentOffset.y;
    const delta = nextY - lastScrollY.current;

    if (nextY < 80 || delta < -8) {
      if (tabBarHidden.current) {
        tabBarHidden.current = false;
        setBottomNavHidden(false);
        DeviceEventEmitter.emit('ks:setTabBarHidden', false);
      }
    } else if (nextY > 220 && delta > 8) {
      if (!tabBarHidden.current) {
        tabBarHidden.current = true;
        setBottomNavHidden(true);
        DeviceEventEmitter.emit('ks:setTabBarHidden', true);
      }
    }

    lastScrollY.current = nextY;
  }, []);

  return { bottomNavHidden, handleScroll };
}



