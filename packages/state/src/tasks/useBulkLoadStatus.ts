import { useCell } from 'tinybase/ui-react';
import { store } from '../store';

export const useBulkLoadStatus = () => {
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
