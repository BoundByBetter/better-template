import { useRowIds } from 'tinybase/ui-react';
import { logCall } from '@boundbybetter/shared';
import { useUserStore } from '../useUserStore';

export const useTaskIds = (): string[] => {
  logCall('useTaskIds');
  const store = useUserStore();
  return useRowIds('tasks', store);
};
