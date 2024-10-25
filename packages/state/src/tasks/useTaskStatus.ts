import { useCell } from 'tinybase/ui-react';
import { FeatureStatus } from '@boundbybetter/shared';
import { useUserStore } from '../useUserStore';
export const useTaskStatus = (taskId: string): FeatureStatus | undefined => {
  const store = useUserStore();
  const status = useCell('tasks', taskId, 'status', store);
  return status === undefined || status === null
    ? undefined
    : (status as FeatureStatus);
};
