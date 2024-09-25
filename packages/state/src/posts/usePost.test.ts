import { renderHook } from '@testing-library/react-native';
import { usePost } from './usePost';
import { store } from '../store';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { globalOptions } from '@boundbybetter/shared';

describe('usePost', () => {
  beforeEach(() => {
    store.delTables();
  });

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

  it('should return undefined for a post with no properties', () => {
    store.setTable('posts', {
      '1': {},
    });

    const { result } = renderHook(() => usePost('1'));

    expect(result.current).toBeUndefined();
  });

  it('should log the caller if provided', () => {
    const spy = jest.spyOn(console, 'log');
    globalOptions.logging = 'true';
    renderHook(() => usePost('1', ['test']));
    expect(spy).toHaveBeenCalledWith(
      expect.any(String),
      'call',
      'test',
      'usePost',
      '1',
    );
    spy.mockRestore();
    globalOptions.logging = 'false';
  });
});
