import { renderHook } from '@testing-library/react-native';
import {
  usePosts,
  usePost,
  usePostStatus,
  useBulkLoadStatus,
  usePostCount,
} from './hooks';
import { store } from '../store';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { act } from 'react-test-renderer';

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

  describe('useBulkLoadStatus', () => {
    it('should return the bulk load status', () => {
      store.setTable('app', {
        status: { isBulkLoading: true, bulkLoadingProgress: 50 },
      });

      const { result } = renderHook(() => useBulkLoadStatus());

      expect(result.current).toEqual({
        isBulkLoading: true,
        bulkLoadingProgress: 50,
      });
    });

    it('should return the bulk load status from the store', () => {
      store.setTable('app', {
        status: { isBulkLoading: true, bulkLoadingProgress: 50 },
      });

      const { result } = renderHook(() => useBulkLoadStatus());

      expect(result.current).toEqual({
        isBulkLoading: true,
        bulkLoadingProgress: 50,
      });
    });
  });

  describe('usePostCount', () => {
    it('should return the correct number of posts', () => {
      store.setTable('posts', {
        '1': { id: '1', title: 'Post 1' },
        '2': { id: '2', title: 'Post 2' },
        '3': { id: '3', title: 'Post 3' },
      });

      const { result } = renderHook(() => usePostCount());

      expect(result.current).toBe(3);
    });

    it('should return 0 when there are no posts', () => {
      const { result } = renderHook(() => usePostCount());

      expect(result.current).toBe(0);
    });

    it('should update when posts are added or removed', () => {
      const { result, rerender } = renderHook(() => usePostCount());

      expect(result.current).toBe(0);

      act(() => {
        store.setRow('posts', '1', { id: '1', title: 'Post 1' });
      });
      rerender(() => usePostCount());
      expect(result.current).toBe(1);

      act(() => {
        store.setRow('posts', '2', { id: '2', title: 'Post 2' });
      });
      rerender(() => usePostCount());
      expect(result.current).toBe(2);

      act(() => {
        store.delRow('posts', '1');
      });
      rerender(() => usePostCount());
      expect(result.current).toBe(1);
    });
  });
});
