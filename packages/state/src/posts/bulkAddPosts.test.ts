import { store } from '../store';
import { bulkAddPosts } from './bulkAddPosts';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

describe('bulkAddPosts', () => {
  beforeEach(() => {
    store.delTables();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should add posts in batches and update bulk loading status', async () => {
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
  });

  it('should not add posts if count is 0 or negative', async () => {
    await bulkAddPosts(0);
    expect(Object.keys(store.getTable('posts')).length).toBe(0);

    await bulkAddPosts(-5);
    expect(Object.keys(store.getTable('posts')).length).toBe(0);
  });
});
