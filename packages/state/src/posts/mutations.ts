import { store } from '../store';
import { logCall, Post } from '@boundbybetter/shared';
import { nanoid } from '@reduxjs/toolkit';

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

export const bulkAddPosts = (count: number) => {
  const now = new Date().toISOString();
  const posts = Array.from({ length: count }, (_, i) => ({
    id: (i + 1).toString(),
    title: `Post ${i + 1}`,
    status: 'ACTIVE',
    rating: 5,
    createdAt: now,
    updatedAt: now,
  }));

  posts.forEach((post) => {
    store.setRow('posts', post.id, post as any);
  });
};

export const clearAllPosts = () => {
  store.delTable('posts');
};
