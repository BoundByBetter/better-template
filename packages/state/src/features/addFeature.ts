import { store } from '../store';
import { Feature } from '@boundbybetter/shared';

export const addFeature = (feature: Feature) => {
  feature.createdAt = new Date().toISOString();
  feature.updatedAt = new Date().toISOString();
  store.setRow('features', feature.id, feature as any);
};
