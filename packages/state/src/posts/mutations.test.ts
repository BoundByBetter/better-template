import { store } from '../store';
import { addPost, updatePost, deletePost } from './mutations';
import { Post, PostStatus } from '@boundbybetter/shared';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('post mutations', () => {
  beforeEach(() => {
    store.delTables();
  });

  describe('addPost', () => {
    it('should add a post to the store with createdAt and updatedAt', () => {
      const post: Post = {
        id: '1',
        title: 'Test Post',
        status: PostStatus.ACTIVE,
        rating: 5,
      };
      addPost(post);
      const storedPost = store.getRow('posts', '1');
      expect(storedPost).toMatchObject({
        ...post,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
      expect(storedPost.createdAt).toBe(storedPost.updatedAt);
    });
  });

  describe('updatePost', () => {
    it('should update an existing post in the store and set updatedAt', async () => {
      const post: Post = {
        id: '1',
        title: 'Test Post',
        status: PostStatus.ACTIVE,
        rating: 5,
      };
      addPost(post);
      const originalPost = store.getRow('posts', '1');
      // delay to force updatedAt to change
      await new Promise((resolve) => setTimeout(resolve, 1));

      const updates: Partial<Post> = { title: 'Updated Post', rating: 4 };
      updatePost('1', updates);

      const updatedPost = store.getRow('posts', '1');
      expect(updatedPost).toMatchObject({
        ...originalPost,
        ...updates,
        updatedAt: expect.any(String),
      });
      expect(updatedPost.updatedAt).not.toBe(updatedPost.createdAt);
    });
  });

  describe('deletePost', () => {
    it('should delete a post from the store', () => {
      const post: Post = {
        id: '1',
        title: 'Test Post',
        status: PostStatus.ACTIVE,
        rating: 5,
        createdAt: '2023-05-01T00:00:00.000Z',
      };
      store.setRow('posts', post.id, post as any);

      deletePost('1');

      const deletedPost = store.getRow('posts', '1');
      expect(deletedPost).toEqual({});
    });
  });
});
