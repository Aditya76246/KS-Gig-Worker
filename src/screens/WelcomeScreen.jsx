import React from "react";
import {
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";

import globalStyles from "../styles/globalStyles";
import { color } from "../styles/theme";
import CustomText from "../components/CustomText";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={[
        tw`flex-1`,
        {
          backgroundColor: "#F7F8F2",
        },
      ]}
    >
      <StatusBar backgroundColor="#F7F8F2" barStyle="dark-content" />

      <View style={tw`flex-1`}>
        <ImageBackground
          source={require("../../assets/Images/Banner/splashBg.png")}
          resizeMode="cover"
          style={[
            tw`flex-1`,
            {
              justifyContent: "space-between",
            },
          ]}
        >
          <View
            style={[
              tw`absolute inset-0`,
              {
                backgroundColor: "rgba(255,255,255,0.15)",
              },
            ]}
          />

          <View />

          <View style={[tw`items-center px-6`]}>
            <Image
              source={require("../../assets/Images/logo/sitelogo2.png")}
              style={{
                width: 260,
                height: 180,
                resizeMode: "contain",
              }}
            />

            <CustomText
              style={[
                globalStyles.f16Medium,
                globalStyles.black,
                globalStyles.textac,
                {
                  marginTop: -10,
                  letterSpacing: 0.4,
                },
              ]}
            >
              Smart Equipment. Stronger Farms.
            </CustomText>
          </View>

          <View
            style={[
              tw`px-6`,
              {
                paddingBottom: 35,
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => navigation.navigate("Login")}
              style={[
                globalStyles.card,
                {
                  backgroundColor: "#118C2E",
                  borderRadius: 22,
                  paddingVertical: 18,
                  paddingHorizontal: 22,
                  marginBottom: 22,
                },
              ]}
            >
              <View
                style={[
                  globalStyles.flexrow,
                  globalStyles.alineItemscenter,
                  globalStyles.justifycenter,
                ]}
              >
                <View
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 50,
                    backgroundColor: color.white,
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    left: 0,
                  }}
                >
                  <Ionicons name="arrow-forward" size={28} color="#118C2E" />
                </View>

                <CustomText
                  style={[globalStyles.f24Bold, globalStyles.textWhite]}
                >
                  Get Started
                </CustomText>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("ChooseLanguage")}
              activeOpacity={0.85}
              style={[
                {
                  borderWidth: 1.5,
                  borderColor: "#118C2E",
                  borderRadius: 22,
                  paddingVertical: 18,
                  paddingHorizontal: 22,
                  backgroundColor: "#f2f2f2",
                },
              ]}
            >
              <View
                style={[
                  globalStyles.flexrow,
                  globalStyles.alineItemscenter,
                  globalStyles.justifycenter,
                ]}
              >
                <View
                  style={{
                    position: "absolute",
                    left: 0,
                  }}
                >
                  <Ionicons name="globe-outline" size={34} color="#118C2E" />
                </View>

                <CustomText
                  style={[
                    globalStyles.f20Bold,
                    {
                      color: "#118C2E",
                    },
                  ]}
                >
                  Change Language
                </CustomText>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
