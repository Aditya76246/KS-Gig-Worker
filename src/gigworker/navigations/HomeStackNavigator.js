import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ImageAnalysisScreen from '../screens/ImageAnalysisScreen';

const Stack = createStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen
        name="ImageAnalysis"
        component={ImageAnalysisScreen}
        options={{ tabBarStyle: { display: 'none' } }}
      />

      {/*
        <Stack.Screen
          name="BookingDetail"
          component={BookingDetailScreen}
          options={{ tabBarStyle: { display: 'none' } }}
        />
      */}
    </Stack.Navigator>
  );
}


