import { FeatureItem } from '../FeatureItem';
import { AddFeature } from '../AddFeature';
import { useFeatures } from '@boundbybetter/state';
import { tg } from '@boundbybetter/ui';

export function FeatureList() {
  const features = useFeatures();

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
