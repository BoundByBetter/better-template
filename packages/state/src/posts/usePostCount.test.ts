import { renderHook } from '@testing-library/react-native';
import { usePostCount } from './usePostCount';
import { store } from '../store';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { act } from 'react-test-renderer';
import { logCall } from '@boundbybetter/shared';

// Mock the logCall function
jest.mock('@boundbybetter/shared', () => ({
  logCall: jest.fn(),
}));

describe('usePostCount', () => {
  beforeEach(() => {
    store.delTables();
    jest.clearAllMocks();
  });

  it('should return the correct number of posts', () => {
    store.setTable('posts', {
      '1': { id: '1', title: 'Post 1' },
      '2': { id: '2', title: 'Post 2' },
      '3': { id: '3', title: 'Post 3' },
    });

    const { result } = renderHook(() => usePostCount());

    expect(result.current).toBe(3);
    expect(logCall).toHaveBeenCalledWith('usePostCount');
  });

  it('should return 0 when there are no posts', () => {
    const { result } = renderHook(() => usePostCount());

    expect(result.current).toBe(0);
    expect(logCall).toHaveBeenCalledWith('usePostCount');
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

    expect(logCall).toHaveBeenCalledTimes(7);
    expect(logCall).toHaveBeenCalledWith('usePostCount');
  });

  it('should log with caller parameter when provided', () => {
    renderHook(() => usePostCount(['ParentComponent']));

    expect(logCall).toHaveBeenCalledWith('ParentComponent', 'usePostCount');
  });

  it('should log with multiple caller parameters when provided', () => {
    renderHook(() => usePostCount(['GrandparentComponent', 'ParentComponent']));

    expect(logCall).toHaveBeenCalledWith(
      'GrandparentComponent',
      'ParentComponent',
      'usePostCount',
    );
  });
});
