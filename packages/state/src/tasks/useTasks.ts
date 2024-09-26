import { useTable } from 'tinybase/ui-react';
import { store } from '../store';
import { Task, logCall } from '@boundbybetter/shared';
import { useMemo } from 'react';

export const useTasks = (): Task[] | undefined => {
  logCall('useTasks');
  const tasks = useTable('tasks', store);

  return useMemo(() => {
    logCall('useTasks', 'useMemo');
    if (Object.keys(tasks).length === 0) return undefined;
    return Object.values(tasks).map(
      (task) =>
        ({
          id: task.id,
          title: task.title,
          status: task.status,
          content: task.content,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
          // ... other fields ...
        }) as Task,
    );
  }, [tasks]);
};
