import { useTable } from 'tinybase/ui-react';
import { store } from '../store';
import { logCall } from '@boundbybetter/shared';

export const usePostCount = (): number => {
  logCall('usePostCount');
  const posts = useTable('posts', store);
  return Object.keys(posts).length;
};
