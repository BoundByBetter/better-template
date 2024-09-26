import { store } from '../store';
import { bulkAddTasks } from './bulkAddTasks';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

describe('bulkAddTasks', () => {
  beforeEach(() => {
    store.delTables();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should add tasks in batches and update bulk loading status', async () => {
    const count = 250;
    const now = new Date('2023-05-01T00:00:00.000Z');
    jest.setSystemTime(now);

    const bulkAddPromise = bulkAddTasks(count);

    // Advance timers until all setTimeout calls are executed
    jest.runAllTimers();

    await bulkAddPromise;

    const tasks = store.getTable('tasks');
    expect(Object.keys(tasks).length).toBe(count);

    Object.values(tasks).forEach((task: any, index) => {
      expect(task).toEqual({
        id: expect.any(String),
        title: `Task ${index + 1}`,
        status: 'ACTIVE',
        rating: 5,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
      });
    });

    // Check that IDs are unique
    const ids = Object.values(tasks).map((task: any) => task.id);
    expect(new Set(ids).size).toBe(count);

    // Check bulk loading status
    expect(store.getCell('app', 'status', 'isBulkLoading')).toBe(false);
    expect(store.getCell('app', 'status', 'bulkLoadingProgress')).toBe(100);
  });

  it('should not add tasks if count is 0 or negative', async () => {
    await bulkAddTasks(0);
    expect(Object.keys(store.getTable('tasks')).length).toBe(0);

    await bulkAddTasks(-5);
    expect(Object.keys(store.getTable('tasks')).length).toBe(0);
  });
});
