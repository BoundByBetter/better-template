import { renderHook } from '@testing-library/react-native';
import { useTask } from './useTask';
import { store } from '../store';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { globalOptions } from '@boundbybetter/shared';

describe('useTask', () => {
  beforeEach(() => {
    store.delTables();
  });

  it('should return a specific task from the store with createdAt and updatedAt', () => {
    const now = new Date().toISOString();
    store.setTable('tasks', {
      '1': {
        id: '1',
        title: 'Task 1',
        status: 'ACTIVE',
        createdAt: now,
        updatedAt: now,
      },
      '2': {
        id: '2',
        title: 'Task 2',
        status: 'INACTIVE',
        createdAt: now,
        updatedAt: now,
      },
    });

    const { result } = renderHook(() => useTask('1'));

    expect(result.current).toEqual({
      id: '1',
      title: 'Task 1',
      status: 'ACTIVE',
      createdAt: now,
      updatedAt: now,
    });
  });

  it('should return undefined for a non-existent task', () => {
    const { result } = renderHook(() => useTask('3'));

    expect(result.current).toBeUndefined();
  });

  it('should return undefined for a task with no properties', () => {
    store.setTable('tasks', {
      '1': {},
    });

    const { result } = renderHook(() => useTask('1'));

    expect(result.current).toBeUndefined();
  });

  it('should log the caller if provided', () => {
    const spy = jest.spyOn(console, 'log');
    globalOptions.logging = 'true';
    renderHook(() => useTask('1', ['test']));
    expect(spy).toHaveBeenCalledWith(
      expect.any(String),
      'call',
      'test',
      'useTask',
      '1',
    );
    spy.mockRestore();
    globalOptions.logging = 'false';
  });
});
