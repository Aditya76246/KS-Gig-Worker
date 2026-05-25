import { View, Text } from "react-native";
import { useTranslation } from "../../localization/i18n";

export default function RegisterScreen() {
  const { tx } = useTranslation();

  return (
    <View>
      <Text>{tx("Register Screen")}</Text>
    </View>
  );
}


