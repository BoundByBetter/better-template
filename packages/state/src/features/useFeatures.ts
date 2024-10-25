import { useTable } from 'tinybase/ui-react';
import { Feature } from '@boundbybetter/shared';
import { useUserStore } from '../useUserStore';

export const useFeatures = (): Feature[] | undefined => {
  const store = useUserStore();
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
