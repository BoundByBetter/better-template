import { FeatureItem } from "../FeatureItem";
import { AddFeature } from "../AddFeature";
import { selectAllFeatures, useAppSelector } from "@boundbybetter/state";
import { tg } from "@boundbybetter/ui";

export function FeatureList() {
  const features = useAppSelector(selectAllFeatures);

  return (
    <tg.YStack gap="$4" mt="$2" testID="feature-list">
      <AddFeature />
      {features &&
        features.map((feature) => (
          <FeatureItem key={feature.id} feature={feature} />
        ))}
    </tg.YStack>
  );
}
