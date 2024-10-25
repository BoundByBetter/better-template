import { useTaskStatus } from './useTaskStatus';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { createStore } from 'tinybase';
import { useUserStore } from '../useUserStore';
import { renderHookWithMockUserStateProvider } from '../renderHookWithMockUserStateProvider.test-util';

jest.mock('../useUserStore');

describe('useTaskStatus', () => {
  let store;

  beforeEach(() => {
    store = createStore();
    (useUserStore as jest.Mock).mockReturnValue(store);
  });

  it('should return the status of a specific task', () => {
    store.setTable('tasks', {
      '1': { id: '1', title: 'Task 1', status: 'ACTIVE' },
      '2': { id: '2', title: 'Task 2', status: 'INACTIVE' },
    });

    const { result } = renderHookWithMockUserStateProvider(store, '1', () =>
      useTaskStatus('2'),
    );

    expect(result.current).toBe('INACTIVE');
  });

  it('should return undefined for a non-existent task', () => {
    const { result } = renderHookWithMockUserStateProvider(store, '1', () =>
      useTaskStatus('3'),
    );

    expect(result.current).toBeUndefined();
  });
});
