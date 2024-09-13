import { renderHook } from '@testing-library/react-native';
import { usePosts, usePost, usePostStatus } from './hooks';
import { store } from '../store';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('post hooks', () => {
  beforeEach(() => {
    store.delTables();
  });

  describe('usePosts', () => {
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

  describe('usePost', () => {
    it('should return a specific post from the store with createdAt and updatedAt', () => {
      const now = new Date().toISOString();
      store.setTable('posts', {
        '1': {
          id: '1',
          title: 'Post 1',
          status: 'ACTIVE',
          createdAt: now,
          updatedAt: now,
        },
        '2': {
          id: '2',
          title: 'Post 2',
          status: 'INACTIVE',
          createdAt: now,
          updatedAt: now,
        },
      });

      const { result } = renderHook(() => usePost('1'));

      expect(result.current).toEqual({
        id: '1',
        title: 'Post 1',
        status: 'ACTIVE',
        createdAt: now,
        updatedAt: now,
      });
    });

    it('should return undefined for a non-existent post', () => {
      const { result } = renderHook(() => usePost('3'));

      expect(result.current).toBeUndefined();
    });
  });

  describe('usePostStatus', () => {
    it('should return the status of a specific post', () => {
      store.setTable('posts', {
        '1': { id: '1', title: 'Post 1', status: 'ACTIVE' },
        '2': { id: '2', title: 'Post 2', status: 'INACTIVE' },
      });

      const { result } = renderHook(() => usePostStatus('2'));

      expect(result.current).toBe('INACTIVE');
    });

    it('should return undefined for a non-existent post', () => {
      const { result } = renderHook(() => usePostStatus('3'));

      expect(result.current).toBeUndefined();
    });
  });
});
