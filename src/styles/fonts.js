import { normalize } from "../utils/normalize";

// Font family names
export const fontFamilies = {
  bold: "Manrope-Bold",
  extraBold: "Manrope-ExtraBold",
  extraLight: "Manrope-ExtraLight",
  light: "Manrope-Light",
  medium: "Manrope-Medium",
  regular: "Manrope-Regular",
  semiBold: "Manrope-SemiBold",
};

export const fontSizes = {
  tiny: normalize(10),
  small: normalize(12),
  regular: normalize(14),
  medium: normalize(16),
  large: normalize(18),
  xLarge: normalize(20),
  xxLarge: normalize(24),
  title: normalize(28),
  heading: normalize(32),
  display: normalize(36),
  hero: normalize(40),
};

const createFont = (size, family, lineHeight = null) => ({
  fontSize: size,
  fontFamily: family,
  ...(lineHeight && { lineHeight }),
});

const sizeScale = {
  tiny: { size: fontSizes.tiny, lineHeight: normalize(14) },
  small: { size: fontSizes.small, lineHeight: normalize(18) },
  regular: { size: fontSizes.regular, lineHeight: normalize(22) },
  medium: { size: fontSizes.medium, lineHeight: normalize(24) },
  large: { size: fontSizes.large, lineHeight: normalize(28) },
  xLarge: { size: fontSizes.xLarge, lineHeight: normalize(30) },
  xxLarge: { size: fontSizes.xxLarge, lineHeight: normalize(32) },
  title: { size: fontSizes.title, lineHeight: normalize(34) },
  heading: { size: fontSizes.heading, lineHeight: normalize(40) },
  display: { size: fontSizes.display, lineHeight: normalize(44) },
  hero: { size: fontSizes.hero, lineHeight: normalize(50) },
};

const weightScale = {
  ExtraLight: fontFamilies.extraLight,
  Light: fontFamilies.light,
  Regular: fontFamilies.regular,
  Medium: fontFamilies.medium,
  SemiBold: fontFamilies.semiBold,
  Bold: fontFamilies.bold,
  ExtraBold: fontFamilies.extraBold,
};

const legacyFonts = Object.entries(sizeScale).reduce((acc, [sizeName, value]) => {
  Object.entries(weightScale).forEach(([weightName, family]) => {
    acc[`${sizeName}${weightName}`] = createFont(
      value.size,
      family,
      value.lineHeight,
    );
  });

  return acc;
}, {});

export const fonts = {
  hero: legacyFonts.heroExtraBold,
  display: legacyFonts.displayBold,
  heading: legacyFonts.headingBold,
  subHeading: legacyFonts.titleSemiBold,
  title: legacyFonts.xxLargeSemiBold,

  bodyXLarge: legacyFonts.xLargeRegular,
  bodyLarge: legacyFonts.largeRegular,
  body: legacyFonts.mediumRegular,
  bodySmall: legacyFonts.regularRegular,
  caption: legacyFonts.smallRegular,
  tiny: legacyFonts.tinyRegular,

  thin: legacyFonts.mediumExtraLight,
  light: legacyFonts.mediumLight,
  medium: legacyFonts.mediumMedium,
  semiBold: legacyFonts.mediumSemiBold,
  bold: legacyFonts.mediumBold,
  extraBold: legacyFonts.mediumExtraBold,

  buttonLarge: legacyFonts.largeSemiBold,
  button: legacyFonts.mediumSemiBold,
  buttonSmall: legacyFonts.regularMedium,

  input: legacyFonts.mediumRegular,
  inputLabel: legacyFonts.regularMedium,
  placeholder: legacyFonts.regularLight,

  ...legacyFonts,
};

export default fonts;

