import { renderHook } from '@testing-library/react-native';
import { usePostStatus } from './usePostStatus';
import { store } from '../store';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('usePostStatus', () => {
  beforeEach(() => {
    store.delTables();
  });

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
