import { useCell } from 'tinybase/ui-react';
import { store } from '../store';
import { FeatureStatus, logCall } from '@boundbybetter/shared';

export const usePostStatus = (postId: string): FeatureStatus | undefined => {
  logCall('usePostStatus', postId);
  const status = useCell('posts', postId, 'status', store);
  return status === undefined || status === null
    ? undefined
    : (status as FeatureStatus);
};
