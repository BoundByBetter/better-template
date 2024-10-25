import { logCall } from '@boundbybetter/shared';
import { useUserStore } from '../useUserStore';

export const useDeleteTask = () => {
  const store = useUserStore();
  return (taskId: string) => {
    logCall('deleteTask', taskId);
    store.delRow('tasks', taskId);
  };
};
