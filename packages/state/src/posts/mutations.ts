import { store } from '../store';
import { logCall, Post } from '@boundbybetter/shared';

export const addPost = (post: Post) => {
  logCall('Adding post', post);
  const now = new Date().toISOString();
  store.setRow('posts', post.id, {
    ...post,
    createdAt: now,
    updatedAt: now,
  } as any);
};

export const updatePost = (postId: string, updates: Partial<Post>) => {
  logCall('Deleting post', postId, updates);
  const updatedAt = new Date().toISOString();
  store.setPartialRow('posts', postId, { ...updates, updatedAt });
};

export const deletePost = (postId: string) => {
  logCall('Deleting post', postId);
  store.delRow('posts', postId);
};
