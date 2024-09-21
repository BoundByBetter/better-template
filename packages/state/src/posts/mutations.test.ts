import { store } from '../store';
import {
  addPost,
  updatePost,
  deletePost,
  bulkAddPosts,
  clearAllPosts,
} from './mutations';
import { Post, PostStatus } from '@boundbybetter/shared';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

describe('post mutations', () => {
  beforeEach(() => {
    store.delTables();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('addPost', () => {
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

  describe('updatePost', () => {
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

  describe('deletePost', () => {
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

  describe('bulkAddPosts', () => {
    it('should add posts in batches and update bulk loading status', async () => {
      jest.useFakeTimers();
      const count = 250;
      const now = new Date('2023-05-01T00:00:00.000Z');
      jest.setSystemTime(now);

      const bulkAddPromise = bulkAddPosts(count);

      // Advance timers until all setTimeout calls are executed
      jest.runAllTimers();

      await bulkAddPromise;

      const posts = store.getTable('posts');
      expect(Object.keys(posts).length).toBe(count);

      Object.values(posts).forEach((post: any, index) => {
        expect(post).toEqual({
          id: expect.any(String),
          title: `Post ${index + 1}`,
          status: 'ACTIVE',
          rating: 5,
          createdAt: now.toISOString(),
          updatedAt: now.toISOString(),
        });
      });

      // Check that IDs are unique
      const ids = Object.values(posts).map((post: any) => post.id);
      expect(new Set(ids).size).toBe(count);

      // Check bulk loading status
      expect(store.getCell('app', 'status', 'isBulkLoading')).toBe(false);
      expect(store.getCell('app', 'status', 'bulkLoadingProgress')).toBe(100);

      jest.useRealTimers();
    });

    it('should not add posts if count is 0 or negative', async () => {
      await bulkAddPosts(0);
      expect(Object.keys(store.getTable('posts')).length).toBe(0);

      await bulkAddPosts(-5);
      expect(Object.keys(store.getTable('posts')).length).toBe(0);
    });
  });

  describe('clearAllPosts', () => {
    it('should remove all posts from the store', () => {
      // Add some posts to the store
      const posts = [
        { id: '1', title: 'Post 1', status: PostStatus.ACTIVE, rating: 5 },
        { id: '2', title: 'Post 2', status: PostStatus.ACTIVE, rating: 4 },
        { id: '3', title: 'Post 3', status: PostStatus.INACTIVE, rating: 3 },
      ];
      posts.forEach((post) => store.setRow('posts', post.id, post as any));

      // Verify posts are in the store
      expect(Object.keys(store.getTable('posts')).length).toBe(3);

      // Call clearAllPosts
      clearAllPosts();

      // Verify all posts have been removed
      expect(Object.keys(store.getTable('posts')).length).toBe(0);
    });
  });
});
