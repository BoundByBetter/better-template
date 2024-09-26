import { useCell } from 'tinybase/ui-react';
import { store } from '../store';
import { FeatureStatus, logCall } from '@boundbybetter/shared';

export const useTaskStatus = (taskId: string): FeatureStatus | undefined => {
  logCall('useTaskStatus', taskId);
  const status = useCell('tasks', taskId, 'status', store);
  return status === undefined || status === null
    ? undefined
    : (status as FeatureStatus);
};
