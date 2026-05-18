import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import OtpScreen from "../screens/OtpScreen";
import HomeScreen from "../screens/HomeScreen";
import KycSetupScreen from "../screens/KycSetupScreen";
import JobDetailsScreen from "../screens/JobDetailsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChooseLanguage from "../screens/ChooseLanguage";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >

        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="KycSetup" component={KycSetupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
        <Stack.Screen name="ChooseLanguage" component={ChooseLanguage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
