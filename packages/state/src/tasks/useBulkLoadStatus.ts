import { useCell } from 'tinybase/ui-react';
import { useUserStore } from '../useUserStore';

export const useBulkLoadStatus = () => {
  const store = useUserStore();
  const isBulkLoading = useCell('app', 'status', 'isBulkLoading', store);
  const bulkLoadingProgress = useCell(
    'app',
    'status',
    'bulkLoadingProgress',
    store,
  );
  return {
    isBulkLoading: isBulkLoading as boolean,
    bulkLoadingProgress: bulkLoadingProgress as number,
  };
};
