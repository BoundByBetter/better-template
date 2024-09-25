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

export const usePost = (
  postId: string,
  caller?: string[],
): Post | undefined => {
  const logParams = caller
    ? [...caller, 'usePost', postId]
    : ['usePost', postId];
  logCall(logParams[0], ...logParams.slice(1));
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

export const useBulkLoadStatus = () => {
  const isBulkLoading = useCell('app', 'status', 'isBulkLoading', store);
  const bulkLoadingProgress = useCell(
    'app',
    'status',
    'bulkLoadingProgress',
    store,
  );
  return {
    isBulkLoading: isBulkLoading as boolean,
    bulkLoadingProgress: bulkLoadingProgress as number,
  };
};

export const usePostCount = (): number => {
  logCall('usePostCount');
  const posts = useTable('posts', store);
  return Object.keys(posts).length;
};
