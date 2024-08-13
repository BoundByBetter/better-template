import { selectFeatureById, useAppSelector } from "@boundbybetter/state";
import { features } from "./Features";
import { FeatureStatus } from "@boundbybetter/shared";

export const useActiveFeature = (featureKey: string): boolean => {
  const featureDetail = features[featureKey];
  const featureOverride = useAppSelector(
    /* istanbul ignore next */ (state) => selectFeatureById(state, featureKey),
  );
  const groups = featureOverride?.groups ?? featureDetail.defaultGroups ?? [];
  const userGroups =
    useAppSelector(/* istanbul ignore next */ (state) => state.user.groups) ??
    /* istanbul ignore next */ [];
  const groupAccess =
    groups.length === 0 ||
    groups.some((group) =>
      userGroups
        .map((group) => group.toLowerCase())
        .includes(group.toLowerCase()),
    );
  const requiresActivation = featureDetail.requiresActivation ?? false;
  const featureActive =
    (!requiresActivation &&
      featureOverride?.status !== FeatureStatus.INACTIVE) ||
    (requiresActivation && featureOverride?.status === FeatureStatus.ACTIVE);
  return groupAccess && featureActive;
};
