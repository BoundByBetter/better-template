import { store } from '../store';
import { logCall, Task } from '@boundbybetter/shared';

export const addTask = (task: Task) => {
  logCall('addTask', task);
  const now = new Date().toISOString();
  store.setRow('tasks', task.id, {
    ...task,
    createdAt: now,
    updatedAt: now,
  } as any);
};
