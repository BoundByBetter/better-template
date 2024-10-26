import { useTaskIds } from './useTaskIds';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { renderHookWithMockUserStateProvider } from '../renderHookWithMockUserStateProvider.test-util';
import { createStore } from 'tinybase';
import { useUserStore } from '../useUserStore';

jest.mock('../useUserStore');

describe('useTaskIds', () => {
  let store;

  beforeEach(() => {
    store = createStore();
    (useUserStore as jest.Mock).mockReturnValue(store);
  });

  it('should return an array of task ids', () => {
    store.setTable('tasks', {
      '1': { id: '1', title: 'Task 1', status: 'ACTIVE' },
      '2': { id: '2', title: 'Task 2', status: 'ACTIVE' },
    });
    const { result } = renderHookWithMockUserStateProvider(store, '1', () =>
      useTaskIds(),
    );
    expect(result.current).toEqual(['1', '2']);
  });

  it('should return an empty array if no tasks are present', () => {
    const { result } = renderHookWithMockUserStateProvider(store, '1', () =>
      useTaskIds(),
    );
    expect(result.current).toEqual([]);
  });
});
