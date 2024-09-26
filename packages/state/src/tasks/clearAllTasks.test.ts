import { store } from '../store';
import { clearAllTasks } from './clearAllTasks';
import { TaskStatus } from '@boundbybetter/shared';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('clearAllTasks', () => {
  beforeEach(() => {
    store.delTables();
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
    clearAllTasks();

    // Verify all tasks have been removed
    expect(Object.keys(store.getTable('tasks')).length).toBe(0);
  });
});
