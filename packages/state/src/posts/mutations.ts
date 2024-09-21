import { store } from '../store';
import { logCall, logMessage, Post } from '@boundbybetter/shared';
import { nanoid } from '@reduxjs/toolkit';

export const addPost = (post: Post) => {
  logCall('addPost', post);
  const now = new Date().toISOString();
  store.setRow('posts', post.id, {
    ...post,
    createdAt: now,
    updatedAt: now,
  } as any);
};

export const updatePost = (postId: string, updates: Partial<Post>) => {
  logCall('updatePost', postId, updates);
  const updatedAt = new Date().toISOString();
  store.setPartialRow('posts', postId, { ...updates, updatedAt });
};

export const deletePost = (postId: string) => {
  logCall('deletePost', postId);
  store.delRow('posts', postId);
};

export const bulkAddPosts = (count: number): Promise<void> => {
  logCall('bulkAddPosts', count);
  return new Promise((resolve) => {
    store.setCell('app', 'status', 'isBulkLoading', true);
    store.setCell('app', 'status', 'bulkLoadingProgress', 0);
    const now = new Date().toISOString();
    let added = 0;

    const addNextBatch = () => {
      const batchSize = Math.min(100, count - added);

      store.transaction(() => {
        for (let i = 0; i < batchSize; i++) {
          const post = {
            id: nanoid(),
            title: `Post ${added + i + 1}`,
            status: 'ACTIVE',
            rating: 5,
            createdAt: now,
            updatedAt: now,
          };
          store.setRow('posts', post.id, post as any);
        }
        added += batchSize;
      });

      const progress = Math.round((added / count) * 100);
      store.setCell('app', 'status', 'bulkLoadingProgress', progress);
      logMessage('Progress:', progress);
      if (added < count) {
        setTimeout(addNextBatch, 0);
      } else {
        store.setCell('app', 'status', 'isBulkLoading', false);
        resolve();
      }
    };

    addNextBatch();
  });
};

export const clearAllPosts = () => {
  logCall('clearAllPosts');
  store.delTable('posts');
};
