import { useTable, useRow } from 'tinybase/ui-react';
import { store } from '../store';
import { Feature, FeatureStatus } from '@boundbybetter/shared';

export const useFeature = (featureId: string): Feature | undefined => {
  const feature = useRow('features', featureId, store);
  return Object.keys(feature).length === 0
    ? undefined
    : ({
        id: feature.id,
        key: feature.key,
        status: feature.status as FeatureStatus,
        groups: feature.groups ? JSON.parse(feature.groups.toString()) : [],
        createdAt: feature.createdAt,
        updatedAt: feature.updatedAt,
      } as Feature);
};

export const useFeatures = (): Feature[] | undefined => {
  const features = useTable('features', store);
  return Object.keys(features).length === 0
    ? undefined
    : Object.values(features).map(
        (feature) =>
          ({
            id: feature.id,
            key: feature.key,
            status: feature.status,
            groups: feature.groups ? JSON.parse(feature.groups.toString()) : [],
            createdAt: feature.createdAt,
            updatedAt: feature.updatedAt,
          }) as Feature,
      );
};
