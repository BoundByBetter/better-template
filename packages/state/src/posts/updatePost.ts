import { store } from '../store';
import { logCall, Post } from '@boundbybetter/shared';

export const updatePost = (postId: string, updates: Partial<Post>) => {
  logCall('updatePost', postId, updates);
  const updatedAt = new Date().toISOString();
  store.setPartialRow('posts', postId, { ...updates, updatedAt });
};
