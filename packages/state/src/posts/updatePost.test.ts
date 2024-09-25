import { store } from '../store';
import { addPost } from './addPost';
import { updatePost } from './updatePost';
import { Post, PostStatus } from '@boundbybetter/shared';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

describe('updatePost', () => {
  beforeEach(() => {
    store.delTables();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should update an existing post in the store and set updatedAt', () => {
    const post: Post = {
      id: '1',
      title: 'Test Post',
      status: PostStatus.ACTIVE,
      rating: 5,
    };
    const createdAt = new Date('2023-01-01T00:00:00.000Z').toISOString();
    jest.setSystemTime(new Date(createdAt));
    addPost(post);

    const updatedAt = new Date('2023-01-02T00:00:00.000Z').toISOString();
    jest.setSystemTime(new Date(updatedAt));

    const updates: Partial<Post> = { title: 'Updated Post', rating: 4 };
    updatePost('1', updates);

    const updatedPost = store.getRow('posts', '1');
    expect(updatedPost).toEqual({
      ...post,
      ...updates,
      createdAt,
      updatedAt,
    });
  });
});
