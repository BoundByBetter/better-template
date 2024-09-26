import { store } from '../store';
import { addTask } from './addTask';
import { updateTask } from './updateTask';
import { Task, TaskStatus } from '@boundbybetter/shared';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

describe('updateTask', () => {
  beforeEach(() => {
    store.delTables();
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
    };
    const createdAt = new Date('2023-01-01T00:00:00.000Z').toISOString();
    jest.setSystemTime(new Date(createdAt));
    addTask(task);

    const updatedAt = new Date('2023-01-02T00:00:00.000Z').toISOString();
    jest.setSystemTime(new Date(updatedAt));

    const updates: Partial<Task> = { title: 'Updated Task', rating: 4 };
    updateTask('1', updates);

    const updatedTask = store.getRow('tasks', '1');
    expect(updatedTask).toEqual({
      ...task,
      ...updates,
      createdAt,
      updatedAt,
    });
  });
});
