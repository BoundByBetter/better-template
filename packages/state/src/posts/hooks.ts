import { useTable, useRow, useCell } from 'tinybase/ui-react';
import { store } from '../store';
import { Post, FeatureStatus, logCall } from '@boundbybetter/shared';
import { useMemo } from 'react';

export const usePosts = (): Post[] | undefined => {
  logCall('usePosts');
  const posts = useTable('posts', store);

  return useMemo(() => {
    logCall('usePosts', 'useMemo');
    if (Object.keys(posts).length === 0) return undefined;
    return Object.values(posts).map(
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
  }, [posts]);
};

export const usePostsPaginated = (
  page: number,
  pageSize: number,
): Post[] | undefined => {
  logCall('usePostsPaginated', page, pageSize);
  // use tinyQL queries to get the page of posts
  const posts = useTable('posts', store);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return Object.values(posts)
    .slice(startIndex, endIndex)
    .map((post) => post as unknown as Post);
};

export const usePost = (postId: string): Post | undefined => {
  logCall('usePost', postId);
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
  logCall('usePostStatus', postId);
  const status = useCell('posts', postId, 'status', store);
  return status === undefined || status === null
    ? undefined
    : (status as FeatureStatus);
};
