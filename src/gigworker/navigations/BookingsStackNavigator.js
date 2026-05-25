import { createStackNavigator } from '@react-navigation/stack';
import BookingsScreen from '../screens/BookingsScreen';
import BookingDetailScreen from '../screens/BookingDetailScreen';
import BookingOngoingScreen from '../screens/BookingOngoingScreen';
import BookingCompletedScreen from '../screens/BookingCompletedScreen';

const Stack = createStackNavigator();

export default function BookingsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BookingsMain" component={BookingsScreen} />
      <Stack.Screen name="BookingDetail" component={BookingDetailScreen} options={{ tabBarStyle: { display: 'none' } }} />
      <Stack.Screen name="BookingOngoing" component={BookingOngoingScreen} options={{ tabBarStyle: { display: 'none' } }} />
      <Stack.Screen name="BookingCompleted" component={BookingCompletedScreen} options={{ tabBarStyle: { display: 'none' } }} />
    </Stack.Navigator>
  );
}



