import { renderHook } from '@testing-library/react-native';
import { usePosts } from './usePosts';
import { store } from '../store';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('usePosts', () => {
  beforeEach(() => {
    store.delTables();
  });

  it('should return all posts from the store as an array with createdAt and updatedAt', () => {
    const now = new Date().toISOString();
    store.setTable('posts', {
      '1': {
        id: '1',
        title: 'Post 1',
        status: 'ACTIVE',
        content: 'Content 1',
        createdAt: now,
        updatedAt: now,
      },
      '2': {
        id: '2',
        title: 'Post 2',
        status: 'INACTIVE',
        content: 'Content 2',
        createdAt: now,
        updatedAt: now,
      },
    });

    const { result } = renderHook(() => usePosts());

    expect(result.current).toEqual([
      {
        id: '1',
        title: 'Post 1',
        status: 'ACTIVE',
        content: 'Content 1',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: '2',
        title: 'Post 2',
        status: 'INACTIVE',
        content: 'Content 2',
        createdAt: now,
        updatedAt: now,
      },
    ]);
  });

  it('should return undefined when there are no posts', () => {
    const { result } = renderHook(() => usePosts());

    expect(result.current).toBeUndefined();
  });
});
