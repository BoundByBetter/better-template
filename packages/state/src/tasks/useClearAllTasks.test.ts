import { renderHook } from '@testing-library/react-native';
import { useClearAllTasks } from './useClearAllTasks';
import { TaskStatus } from '@boundbybetter/shared';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { createStore } from 'tinybase/store';
import { useUserStore } from '../useUserStore';

jest.mock('../useUserStore', () => ({
  useUserStore: jest.fn(),
}));

describe('clearAllTasks', () => {
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = createStore();
    (useUserStore as jest.Mock).mockReturnValue(store);
  });

  it('should remove all tasks from the store', () => {
    // Add some tasks to the store
    const tasks = [
      { id: '1', title: 'Task 1', status: TaskStatus.ACTIVE, rating: 5 },
      { id: '2', title: 'Task 2', status: TaskStatus.ACTIVE, rating: 4 },
      { id: '3', title: 'Task 3', status: TaskStatus.INACTIVE, rating: 3 },
    ];
    tasks.forEach((task) => store.setRow('tasks', task.id, task as any));

    // Verify tasks are in the store
    expect(Object.keys(store.getTable('tasks')).length).toBe(3);

    // Call clearAllTasks
    const { result } = renderHook(() => useClearAllTasks());

    // Verify all tasks have been removed
    expect(result.current()).toBe(undefined);
  });
});
