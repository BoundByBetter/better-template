import { renderHook } from '@testing-library/react-native';
import { useDeleteTask } from './useDeleteTask';
import { Task, TaskStatus } from '@boundbybetter/shared';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { createStore } from 'tinybase/store';
import { useUserStore } from '../useUserStore';

jest.mock('../useUserStore', () => ({
  useUserStore: jest.fn(),
}));

describe('deleteTask', () => {
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = createStore();
    (useUserStore as jest.Mock).mockReturnValue(store);
  });

  it('should delete a task from the store', () => {
    const task: Task = {
      id: '1',
      title: 'Test Task',
      status: TaskStatus.ACTIVE,
      rating: 5,
      createdAt: '2023-05-01T00:00:00.000Z',
      updatedAt: '2023-05-01T00:00:00.000Z',
    };
    store.setRow('tasks', task.id, task as any);

    const { result } = renderHook(() => useDeleteTask());
    result.current('1');

    const deletedTask = store.getRow('tasks', '1');
    expect(deletedTask).toEqual({});
  });
});
