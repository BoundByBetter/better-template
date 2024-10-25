import { Feature } from '@boundbybetter/shared';
import { useUserStore } from '../useUserStore';

export const useUpdateFeature = () => {
  const store = useUserStore();
  return (featureId: string, updates: Partial<Feature>) => {
    updates.updatedAt = new Date().toISOString();
    store.setPartialRow('features', featureId, updates as any);
  };
};
