import { store } from '../store';
import { Feature } from '@boundbybetter/shared';

export const updateFeature = (featureId: string, updates: Partial<Feature>) => {
  updates.updatedAt = new Date().toISOString();
  store.setPartialRow('features', featureId, updates as any);
};
