import { useTable, useRow, useCell } from 'tinybase/ui-react';
import { store } from '../store';
import { Post, FeatureStatus } from '@boundbybetter/shared';

export const usePosts = (): Post[] | undefined => {
  const posts = useTable('posts', store);
  return Object.keys(posts).length === 0
    ? undefined
    : Object.values(posts).map(
        (post) =>
          ({
            id: post.id,
            title: post.title,
            status: post.status,
            content: post.content,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            // ... other fields ...
          }) as Post,
      );
};

export const usePost = (postId: string): Post | undefined => {
  const post = useRow('posts', postId, store);
  return Object.keys(post).length === 0
    ? undefined
    : ({
        id: post.id,
        title: post.title,
        status: post.status,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        // ... other fields ...
      } as Post);
};

export const usePostStatus = (postId: string): FeatureStatus | undefined => {
  const status = useCell('posts', postId, 'status', store);
  return status === undefined || status === null
    ? undefined
    : (status as FeatureStatus);
};
