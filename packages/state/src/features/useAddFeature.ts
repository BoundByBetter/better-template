import { Feature } from '@boundbybetter/shared';
import { useUserStore } from '../useUserStore';

export const useAddFeature = () => {
  const store = useUserStore();
  return (feature: Feature) => {
    feature.createdAt = new Date().toISOString();
    feature.updatedAt = new Date().toISOString();
    store.setRow('features', feature.id, feature as any);
  };
};
