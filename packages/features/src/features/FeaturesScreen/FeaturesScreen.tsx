import { FeatureList } from "../FeatureList";
import { ScrollView } from "react-native";
import { tg } from "@boundbybetter/ui";

export function FeaturesScreen() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ alignSelf: "stretch", margin: 12 }}
    >
      <tg.YStack gap="$4">
        <FeatureList />
      </tg.YStack>
    </ScrollView>
  );
}
