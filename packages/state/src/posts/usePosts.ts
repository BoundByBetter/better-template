import { useTable } from 'tinybase/ui-react';
import { store } from '../store';
import { Post, logCall } from '@boundbybetter/shared';
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
