import { store } from '../store';
import { deleteTask } from './deleteTask';
import { Task, TaskStatus } from '@boundbybetter/shared';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('deleteTask', () => {
  beforeEach(() => {
    store.delTables();
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

    deleteTask('1');

    const deletedTask = store.getRow('tasks', '1');
    expect(deletedTask).toEqual({});
  });
});
