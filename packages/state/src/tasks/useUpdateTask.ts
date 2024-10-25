import { logCall, Task } from '@boundbybetter/shared';
import { useUserStore } from '../useUserStore';

export const useUpdateTask = () => {
  const store = useUserStore();
  return (taskId: string, updates: Partial<Task>) => {
    logCall('updateTask', taskId, updates);
    const updatedAt = new Date().toISOString();
    store.setPartialRow('tasks', taskId, { ...updates, updatedAt });
  };
};
