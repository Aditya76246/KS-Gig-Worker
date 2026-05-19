
import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const scale = Math.min(SCREEN_WIDTH / 375, 1.2);

export const normalize = (size) => {
  const newSize = size * scale;

  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
