import { useAddTask } from './useAddTask';
import { useUpdateTask } from './useUpdateTask';
import { Task, TaskStatus } from '@boundbybetter/shared';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { createStore } from 'tinybase';
import { useUserStore } from '../useUserStore';
import { renderHookWithMockUserStateProvider } from '../renderHookWithMockUserStateProvider.test-util';

jest.mock('../useUserStore');

describe('updateTask', () => {
  let store;

  beforeEach(() => {
    store = createStore();
    (useUserStore as jest.Mock).mockReturnValue(store);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should update an existing task in the store and set updatedAt', () => {
    const task: Task = {
      id: '1',
      title: 'Test Task',
      status: TaskStatus.ACTIVE,
      rating: 5,
      createdAt: new Date('2023-01-01T00:00:00.000Z').toISOString(),
    };
    store.setTable('tasks', {
      '1': task,
    });
    const updatedAt = new Date('2023-01-02T00:00:00.000Z').toISOString();
    jest.setSystemTime(new Date(updatedAt));

    const updates: Partial<Task> = { title: 'Updated Task', rating: 4 };
    const target = renderHookWithMockUserStateProvider(store, '1', () =>
      useUpdateTask(),
    );

    target.result.current('1', updates);

    const updatedTask = store.getRow('tasks', '1');
    expect(updatedTask).toEqual({
      ...task,
      ...updates,
      updatedAt,
    });
  });
});
