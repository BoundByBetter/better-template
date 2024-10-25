import { useFeature } from '@boundbybetter/state';
import { features } from './Features';
import { FeatureStatus } from '@boundbybetter/shared';
import { useCurrentUser } from '@boundbybetter/auth';

export const useActiveFeature = (featureKey: string): boolean => {
  const featureDetail = features[featureKey];
  const featureOverride = useFeature(featureKey);
  const currentUser = useCurrentUser();
  if (!featureDetail) return false;
  const groups = featureOverride?.groups ?? featureDetail.defaultGroups ?? [];
  const userGroups = currentUser?.groups ?? [];
  const groupAccess =
    groups.length === 0 ||
    groups.some((group) =>
      userGroups.some(
        (userGroup) => userGroup.toLowerCase() === group.toLowerCase(),
      ),
    );
  const requiresActivation = featureDetail.requiresActivation ?? false;
  const featureActive =
    (!requiresActivation &&
      featureOverride?.status !== FeatureStatus.INACTIVE) ||
    (requiresActivation && featureOverride?.status === FeatureStatus.ACTIVE);
  return groupAccess && featureActive;
};
