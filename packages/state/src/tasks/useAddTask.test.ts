import { renderHook } from '@testing-library/react-native';
import { useAddTask } from './useAddTask';
import { Task, TaskStatus } from '@boundbybetter/shared';
import { useUserStore } from '../useUserStore';
import { describe, it, expect, beforeEach } from '@jest/globals';

jest.mock('../useUserStore', () => ({
  useUserStore: jest.fn(),
}));

describe('useAddTask', () => {
  const mockSetRow = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useUserStore as jest.Mock).mockReturnValue({
      setRow: mockSetRow,
    });
  });

  it('should add a task to the store with createdAt and updatedAt', () => {
    const task: Task = {
      id: '1',
      title: 'Test Task',
      status: TaskStatus.ACTIVE,
      rating: 5,
    };

    const { result } = renderHook(() => useAddTask());
    result.current(task);

    expect(mockSetRow).toHaveBeenCalledWith('tasks', task.id, {
      ...task,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it('should set createdAt and updatedAt fields correctly', () => {
    const task: Task = {
      id: '1',
      title: 'Test Task',
      status: TaskStatus.ACTIVE,
      rating: 5,
    };

    const { result } = renderHook(() => useAddTask());
    result.current(task);

    const addedTask = mockSetRow.mock.calls[0][2];
    expect(addedTask.createdAt).toBeDefined();
    expect(addedTask.updatedAt).toBeDefined();
  });
});
