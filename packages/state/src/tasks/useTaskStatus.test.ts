import { renderHook } from '@testing-library/react-native';
import { useTaskStatus } from './useTaskStatus';
import { store } from '../store';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('useTaskStatus', () => {
  beforeEach(() => {
    store.delTables();
  });

  it('should return the status of a specific task', () => {
    store.setTable('tasks', {
      '1': { id: '1', title: 'Task 1', status: 'ACTIVE' },
      '2': { id: '2', title: 'Task 2', status: 'INACTIVE' },
    });

    const { result } = renderHook(() => useTaskStatus('2'));

    expect(result.current).toBe('INACTIVE');
  });

  it('should return undefined for a non-existent task', () => {
    const { result } = renderHook(() => useTaskStatus('3'));

    expect(result.current).toBeUndefined();
  });
});
