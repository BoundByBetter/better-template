import { FeatureList } from "../FeatureList";
import { ScrollView } from "react-native";
import { YStack } from "@boundbybetter/ui";

export function FeaturesScreen() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ alignSelf: 'stretch', margin: 12 }}
    >
      <YStack gap="$4">
        <FeatureList />
      </YStack>
    </ScrollView>
  )
}
