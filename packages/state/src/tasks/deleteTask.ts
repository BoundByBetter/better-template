import { store } from '../store';
import { logCall } from '@boundbybetter/shared';

export const deleteTask = (taskId: string) => {
  logCall('deleteTask', taskId);
  store.delRow('tasks', taskId);
};
