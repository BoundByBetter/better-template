import { renderHook } from '@testing-library/react-native';
import { useTasks } from './useTasks';
import { store } from '../store';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('useTasks', () => {
  beforeEach(() => {
    store.delTables();
  });

  it('should return all tasks from the store as an array with createdAt and updatedAt', () => {
    const now = new Date().toISOString();
    store.setTable('tasks', {
      '1': {
        id: '1',
        title: 'Task 1',
        status: 'ACTIVE',
        content: 'Content 1',
        createdAt: now,
        updatedAt: now,
      },
      '2': {
        id: '2',
        title: 'Task 2',
        status: 'INACTIVE',
        content: 'Content 2',
        createdAt: now,
        updatedAt: now,
      },
    });

    const { result } = renderHook(() => useTasks());

    expect(result.current).toEqual([
      {
        id: '1',
        title: 'Task 1',
        status: 'ACTIVE',
        content: 'Content 1',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: '2',
        title: 'Task 2',
        status: 'INACTIVE',
        content: 'Content 2',
        createdAt: now,
        updatedAt: now,
      },
    ]);
  });

  it('should return undefined when there are no tasks', () => {
    const { result } = renderHook(() => useTasks());

    expect(result.current).toBeUndefined();
  });
});
