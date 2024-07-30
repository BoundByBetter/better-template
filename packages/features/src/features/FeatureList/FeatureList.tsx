import { FeatureItem } from '../FeatureItem';
import { AddFeature } from '../AddFeature';
import { selectAllFeatures, useAppSelector } from '@boundbybetter/state';
import { YStack } from '@boundbybetter/ui'

export function FeatureList() {
  const features = useAppSelector(selectAllFeatures)

  return (
    <YStack gap="$4" mt="$2" testID='feature-list'>
      <AddFeature />
      {features && features.map((feature) => (
        <FeatureItem key={feature.id} feature={feature} />
      ))}
    </YStack>
  );
}

