import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import { EditScreenInfo } from "@boundbybetter/features";
import { H3, Separator, YStack } from "@boundbybetter/ui";

export default function ModalScreen() {
  return (
    <YStack>
      <H3>Modal</H3>
      <Separator />
      <EditScreenInfo path="app/modal.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar
        style={
          /*istanbul ignore next*/ Platform.OS === "ios" ? "light" : "auto"
        }
      />
    </YStack>
  );
}
