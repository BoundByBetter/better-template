import { Settings } from "@boundbybetter/features";
import { tg } from "@boundbybetter/ui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function SettingsTab() {
  const insets = useSafeAreaInsets();
  return (
    <tg.YStack f={1} ml={insets.left} mr={insets.right}>
      <Settings />
    </tg.YStack>
  );
}
