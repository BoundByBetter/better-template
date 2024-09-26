import { store } from '../store';
import { logCall } from '@boundbybetter/shared';

export const clearAllTasks = () => {
  logCall('clearAllTasks');
  store.delTable('tasks');
};
