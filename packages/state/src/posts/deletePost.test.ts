import { store } from '../store';
import { deletePost } from './deletePost';
import { Post, PostStatus } from '@boundbybetter/shared';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('deletePost', () => {
  beforeEach(() => {
    store.delTables();
  });

  it('should delete a post from the store', () => {
    const post: Post = {
      id: '1',
      title: 'Test Post',
      status: PostStatus.ACTIVE,
      rating: 5,
      createdAt: '2023-05-01T00:00:00.000Z',
      updatedAt: '2023-05-01T00:00:00.000Z',
    };
    store.setRow('posts', post.id, post as any);

    deletePost('1');

    const deletedPost = store.getRow('posts', '1');
    expect(deletedPost).toEqual({});
  });
});
