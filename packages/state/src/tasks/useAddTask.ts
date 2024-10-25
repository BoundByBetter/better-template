import { logCall, Task } from '@boundbybetter/shared';
import { useUserStore } from '../useUserStore';
import { MergeableStore } from 'tinybase/mergeable-store';

export const useAddTask = () => {
  const store = useUserStore() as MergeableStore;
  logCall('useAddTask', 'store', store);
  return (task: Task) => {
    logCall('addTask', task, store);
    const now = new Date().toISOString();
    store.setRow('tasks', task.id, {
      ...task,
      createdAt: now,
      updatedAt: now,
    } as any);
  };
};
