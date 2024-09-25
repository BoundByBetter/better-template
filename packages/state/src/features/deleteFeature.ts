import { store } from '../store';

export const deleteFeature = (featureId: string) => {
  store.delRow('features', featureId);
};
