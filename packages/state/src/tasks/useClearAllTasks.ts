import { logCall } from '@boundbybetter/shared';
import { useUserStore } from '../useUserStore';

export const useClearAllTasks = () => {
  const store = useUserStore();
  return () => {
    logCall('clearAllTasks');
    store.delTable('tasks');
  };
};
