import { useRow } from 'tinybase/ui-react';
import { store } from '../store';
import { Post, logCall } from '@boundbybetter/shared';

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
