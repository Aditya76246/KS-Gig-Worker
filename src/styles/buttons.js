import { StyleSheet } from "react-native";
import { color } from "./theme";
import { fonts } from "./fonts";

export const buttonStyles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  primary: {
    backgroundColor: color.primary,
  },
  primaryPressed: {
    backgroundColor: color.primaryLight,
  },
  secondary: {
    backgroundColor: color.yellow,
  },
  dark: {
    backgroundColor: color.black,
  },
  outline: {
    backgroundColor: color.transparent,
    borderWidth: 1.5,
    borderColor: color.primary,
  },
  ghost: {
    backgroundColor: color.transparent,
    minHeight: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  text: {
    ...fonts.button,
    color: color.textWhite,
    textAlign: "center",
  },
  textDark: {
    ...fonts.button,
    color: color.black,
    textAlign: "center",
  },
  textPrimary: {
    ...fonts.button,
    color: color.primary,
    textAlign: "center",
  },
  small: {
    minHeight: 36,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  smallText: {
    ...fonts.buttonSmall,
    color: color.textWhite,
    textAlign: "center",
  },
  large: {
    minHeight: 64,
    borderRadius: 18,
    paddingHorizontal: 22,
    paddingVertical: 18,
  },
  largeText: {
    ...fonts.buttonLarge,
    color: color.textWhite,
    textAlign: "center",
  },
  iconRight: {
    position: "absolute",
    right: 24,
  },
  iconLeft: {
    position: "absolute",
    left: 18,
  },
});

export default buttonStyles;



