import { store } from '../store';
import { Post } from '@boundbybetter/shared';

export const addPost = (post: Post) => {
  const now = new Date().toISOString();
  store.setRow('posts', post.id, {
    ...post,
    createdAt: now,
    updatedAt: now,
  } as any);
};

export const updatePost = (postId: string, updates: Partial<Post>) => {
  const updatedAt = new Date().toISOString();
  store.setPartialRow('posts', postId, { ...updates, updatedAt });
};

export const deletePost = (postId: string) => {
  store.delRow('posts', postId);
};
