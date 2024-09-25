import { store } from '../store';
import { logCall } from '@boundbybetter/shared';

export const clearAllPosts = () => {
  logCall('clearAllPosts');
  store.delTable('posts');
};
