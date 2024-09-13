import { store } from '../store';
import { Feature } from '@boundbybetter/shared';

export const addFeature = (feature: Feature) => {
  feature.createdAt = new Date().toISOString();
  feature.updatedAt = new Date().toISOString();
  store.setRow('features', feature.id, feature as any);
};

export const updateFeature = (featureId: string, updates: Partial<Feature>) => {
  updates.updatedAt = new Date().toISOString();
  store.setPartialRow('features', featureId, updates as any);
};

export const deleteFeature = (featureId: string) => {
  store.delRow('features', featureId);
};
