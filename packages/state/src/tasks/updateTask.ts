import { store } from '../store';
import { logCall, Task } from '@boundbybetter/shared';

export const updateTask = (taskId: string, updates: Partial<Task>) => {
  logCall('updateTask', taskId, updates);
  const updatedAt = new Date().toISOString();
  store.setPartialRow('tasks', taskId, { ...updates, updatedAt });
};
