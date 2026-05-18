import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";

import globalStyles from "../styles/globalStyles";
import { color } from "../styles/theme";
import CustomText from "../components/CustomText";
import { useNavigation } from "@react-navigation/native";
const languages = [
  {
    id: 1,
    title: "English",
    subtitle: "English",
    short: "A文",
  },
  {
    id: 2,
    title: "हिंदी (Hindi)",
    subtitle: "Hindi",
    short: "अ",
  },
  {
    id: 3,
    title: "मराठी (Marathi)",
    subtitle: "Marathi",
    short: "म",
  },
  {
    id: 4,
    title: "ಕನ್ನಡ (Kannada)",
    subtitle: "Kannada",
    short: "ಚ",
  },
  {
    id: 5,
    title: "తెలుగు (Telugu)",
    subtitle: "Telugu",
    short: "తెలు",
  },
];

export default function ChooseLanguage() {
  const [selectedLanguage, setSelectedLanguage] = useState(1);
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

      <ImageBackground
        source={require("../../assets/Images/Banner/splashBg.png")}
        resizeMode="cover"
        style={tw`flex-1`}
      >
        <View
          style={[
            tw`absolute inset-0`,
            {
              backgroundColor: "rgba(255,255,255,0.82)",
            },
          ]}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 22,
            paddingTop: 20,
            paddingBottom: 40,
            flexGrow: 1,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Login")}
            style={[
              globalStyles.flexrow,
              globalStyles.alineItemscenter,
              globalStyles.alineSelfend,
              {
                marginTop: 10,
              },
            ]}
          >
            {/* <Ionicons
              name="globe-outline"
              size={24}
              color="#118C2E"
            /> */}

            <CustomText
              style={[
                globalStyles.f16Bold,
                {
                  color: "#118C2E",
                  marginLeft: 8,
                },
              ]}
            >
              Skip
            </CustomText>
          </TouchableOpacity>

          <View
            style={[
              globalStyles.alineItemscenter,
              {
                marginTop: 30,
                marginBottom: 30,
              },
            ]}
          >
            <View
              style={{
                width: 76,
                height: 76,
                borderRadius: 50,
                borderWidth: 1.5,
                borderColor: "#B7D8BD",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 24,
                backgroundColor: "rgba(17,140,46,0.03)",
              }}
            >
              <Ionicons name="globe-outline" size={38} color="#118C2E" />
            </View>

            <CustomText
              style={[
                globalStyles.f32Bold,
                globalStyles.black,
                globalStyles.textac,
              ]}
            >
              Choose Language
            </CustomText>

            <CustomText
              style={[
                globalStyles.f18Regular,
                globalStyles.neutral500,
                globalStyles.textac,
                {
                  marginTop: 10,
                },
              ]}
            >
              Select your preferred language
            </CustomText>
          </View>

          {languages.map((item) => {
            const isSelected = selectedLanguage === item.id;

            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.85}
                onPress={() => setSelectedLanguage(item.id)}
                style={[
                  styles.languageCard,
                  isSelected && styles.languageCardSelected,
                ]}
              >
                <View
                  style={[
                    styles.radioOuter,
                    isSelected && styles.radioOuterSelected,
                  ]}
                >
                  {isSelected && <View style={styles.radioInner} />}
                </View>

                <View style={{ flex: 1 }}>
                  <CustomText
                    style={[globalStyles.f16Bold, globalStyles.black]}
                  >
                    {item.title}
                  </CustomText>

                  <CustomText
                    style={[
                      globalStyles.f16Regular,
                      globalStyles.neutral500,
                      {
                        marginTop: 4,
                      },
                    ]}
                  >
                    {item.subtitle}
                  </CustomText>
                </View>

                <View style={styles.languageBadge}>
                  <CustomText
                    style={[
                      globalStyles.f20Bold,
                      {
                        color: "#118C2E",
                      },
                    ]}
                  >
                    {item.short}
                  </CustomText>
                </View>
              </TouchableOpacity>
            );
          })}

          <View style={{ flex: 1 }} />

          <View
            style={{
              paddingHorizontal: 2,
              marginTop: 10,
              paddingBottom: 10,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate("Login")}
              style={styles.continueButton}
            >
              <CustomText
                style={[
                  globalStyles.f24Bold,
                  globalStyles.textWhite,
                  {
                    letterSpacing: 0.3,
                  },
                ]}
              >
                Continue
              </CustomText>

              <View style={styles.continueArrowWrap}>
                <Ionicons name="arrow-forward" size={34} color="#FFFFFF" />
              </View>
            </TouchableOpacity>

            <View
              style={[
                globalStyles.flexrow,
                globalStyles.justifycenter,
                globalStyles.alineItemscenter,
                {
                  marginTop: 22,
                },
              ]}
            >
              <Ionicons
                name="shield-checkmark-outline"
                size={26}
                color="#118C2E"
              />

              <CustomText
                style={[
                  globalStyles.f16Regular,
                  {
                    marginLeft: 8,
                    color: "#4A4A4A",
                  },
                ]}
              >
                <CustomText
                  style={[
                    globalStyles.f16Bold,
                    {
                      color: "#118C2E",
                    },
                  ]}
                >
                  100%
                </CustomText>{" "}
                Secure
              </CustomText>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = {
  languageCard: {
    height: 60,
    borderRadius: 24,
    backgroundColor: "#ffffffbf",

    borderWidth: 1,
    borderColor: "#E2E2E2",

    marginBottom: 18,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 18,
  },

  languageCardSelected: {
    borderColor: "#118C2E",
    backgroundColor: "rgba(17,140,46,0.04)",
  },

  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 50,

    borderWidth: 2,
    borderColor: "#C8C8C8",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 18,
  },

  radioOuterSelected: {
    borderColor: "#118C2E",
  },

  radioInner: {
    width: 18,
    height: 18,
    borderRadius: 50,
    backgroundColor: "#118C2E",
  },

  languageBadge: {
    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 10,
  },

  continueButton: {
    height: 60,
    backgroundColor: "#118C2E",

    borderRadius: 26,

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 8,

    position: "relative",
  },

  continueArrowWrap: {
    position: "absolute",
    right: 24,

    justifyContent: "center",
    alignItems: "center",
  },
};
