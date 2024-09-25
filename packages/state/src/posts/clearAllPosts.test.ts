import { store } from '../store';
import { clearAllPosts } from './clearAllPosts';
import { PostStatus } from '@boundbybetter/shared';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('clearAllPosts', () => {
  beforeEach(() => {
    store.delTables();
  });

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
