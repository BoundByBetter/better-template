import { logCall, logMessage } from '@boundbybetter/shared';
import { nanoid } from '@reduxjs/toolkit';
import { useUserStore } from '../useUserStore';

export const useBulkAddTasks = () => {
  const store = useUserStore();
  return (count: number): Promise<void> => {
    logCall('bulkAddTasks', count);
    return new Promise((resolve) => {
      store.setCell('app', 'status', 'isBulkLoading', true);
      store.setCell('app', 'status', 'bulkLoadingProgress', 0);
      const now = new Date().toISOString();
      let added = 0;

      const addNextBatch = () => {
        const batchSize = Math.min(100, count - added);

        store.transaction(() => {
          for (let i = 0; i < batchSize; i++) {
            const task = {
              id: nanoid(),
              title: `Task ${added + i + 1}`,
              status: 'ACTIVE',
              rating: 5,
              createdAt: now,
              updatedAt: now,
            };
            store.setRow('tasks', task.id, task as any);
          }
          added += batchSize;
        });

        const progress = Math.round((added / count) * 100);
        store.setCell('app', 'status', 'bulkLoadingProgress', progress);
        logMessage('Progress:', progress);
        if (added < count) {
          setTimeout(addNextBatch, 0);
        } else {
          store.setCell('app', 'status', 'isBulkLoading', false);
          resolve();
        }
      };

      addNextBatch();
    });
  };
};
