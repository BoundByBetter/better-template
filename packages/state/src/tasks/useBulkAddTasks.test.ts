import { useBulkAddTasks } from './useBulkAddTasks';
import { useUserStore } from '../useUserStore';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { createStore, Store } from 'tinybase';

jest.mock('../useUserStore', () => ({
  useUserStore: jest.fn(),
}));

describe('bulkAddTasks', () => {
  let store: Store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = createStore(); // Create a real store instance
    (useUserStore as jest.Mock).mockReturnValue(store);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should add tasks in batches and update bulk loading status', async () => {
    const count = 250;
    const now = new Date('2023-05-01T00:00:00.000Z').toISOString();
    jest.setSystemTime(new Date(now));

    const bulkAddTasks = useBulkAddTasks(); // Get the function from the hook
    const bulkAddPromise = bulkAddTasks(count); // Call the function with the count

    // Advance timers until all setTimeout calls are executed
    jest.runAllTimers();

    await bulkAddPromise;

    expect(store.getRowIds('tasks').length).toBe(count); // Check if tasks were added
    for (let index = 0; index < count; index++) {
      const ids = store.getRowIds('tasks');
      expect(store.getRow('tasks', ids[index])).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          title: `Task ${index + 1}`,
          status: 'ACTIVE',
          rating: 5,
          createdAt: now,
          updatedAt: now,
        }),
      );
    }

    // Check bulk loading status
    expect(store.getCell('app', 'status', 'isBulkLoading')).toBe(false);
    expect(store.getCell('app', 'status', 'bulkLoadingProgress')).toBe(100);
  });

  it('should not add tasks if count is 0 or negative', async () => {
    const bulkAddTasks = useBulkAddTasks(); // Get the function from the hook

    await bulkAddTasks(0);
    expect(store.getRowIds('tasks').length).toBe(0);

    await bulkAddTasks(-5);
    expect(store.getRowIds('tasks').length).toBe(0);
  });
});
