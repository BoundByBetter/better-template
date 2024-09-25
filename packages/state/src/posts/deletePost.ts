import { store } from '../store';
import { logCall } from '@boundbybetter/shared';

export const deletePost = (postId: string) => {
  logCall('deletePost', postId);
  store.delRow('posts', postId);
};
