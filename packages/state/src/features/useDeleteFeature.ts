import { useUserStore } from '../useUserStore';

export const useDeleteFeature = () => {
  const store = useUserStore();
  return (featureId: string) => {
    store.delRow('features', featureId);
  };
};
