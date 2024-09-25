import { store } from '../store';
import { logCall, Post } from '@boundbybetter/shared';

export const addPost = (post: Post) => {
  logCall('addPost', post);
  const now = new Date().toISOString();
  store.setRow('posts', post.id, {
    ...post,
    createdAt: now,
    updatedAt: now,
  } as any);
};
