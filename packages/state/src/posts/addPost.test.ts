import { store } from '../store';
import { addPost } from './addPost';
import { Post, PostStatus } from '@boundbybetter/shared';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

describe('addPost', () => {
  beforeEach(() => {
    store.delTables();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should add a post to the store with createdAt and updatedAt', () => {
    const post: Post = {
      id: '1',
      title: 'Test Post',
      status: PostStatus.ACTIVE,
      rating: 5,
    };
    const now = new Date().toISOString();
    jest.setSystemTime(new Date(now));

    addPost(post);

    const storedPost = store.getRow('posts', '1');
    expect(storedPost).toEqual({
      ...post,
      createdAt: now,
      updatedAt: now,
    });
  });
});
