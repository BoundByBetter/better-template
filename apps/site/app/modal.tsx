import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";

import { EditScreenInfo } from "@boundbybetter/features";
import { tg } from "@boundbybetter/ui";

export default function ModalScreen() {
  return (
    <tg.YStack>
      <tg.H3>Modal</tg.H3>
      <tg.Separator />
      <EditScreenInfo path="app/modal.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar
        style={
          /*istanbul ignore next*/ Platform.OS === "ios" ? "light" : "auto"
        }
      />
    </tg.YStack>
  );
}
