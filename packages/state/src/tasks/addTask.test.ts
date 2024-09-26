import { store } from '../store';
import { addTask } from './addTask';
import { Task, TaskStatus } from '@boundbybetter/shared';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

describe('addTask', () => {
  beforeEach(() => {
    store.delTables();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should add a task to the store with createdAt and updatedAt', () => {
    const task: Task = {
      id: '1',
      title: 'Test Task',
      status: TaskStatus.ACTIVE,
      rating: 5,
    };
    const now = new Date().toISOString();
    jest.setSystemTime(new Date(now));

    addTask(task);

    const storedTask = store.getRow('tasks', '1');
    expect(storedTask).toEqual({
      ...task,
      createdAt: now,
      updatedAt: now,
    });
  });
});
