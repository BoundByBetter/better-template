import { useRow } from 'tinybase/ui-react';
import { store } from '../store';
import { Task, logCall } from '@boundbybetter/shared';

export const useTask = (
  taskId: string,
  caller?: string[],
): Task | undefined => {
  const logParams = caller
    ? [...caller, 'useTask', taskId]
    : ['useTask', taskId];
  logCall(logParams[0], ...logParams.slice(1));
  const task = useRow('tasks', taskId, store);
  return Object.keys(task).length === 0
    ? undefined
    : ({
        id: task.id,
        title: task.title,
        status: task.status,
        content: task.content,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
        // ... other fields ...
      } as Task);
};
