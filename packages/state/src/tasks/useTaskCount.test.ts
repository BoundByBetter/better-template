import { renderHook } from '@testing-library/react-native';
import { useTaskCount } from './useTaskCount';
import { store } from '../store';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { act } from 'react-test-renderer';
import { logCall } from '@boundbybetter/shared';

// Mock the logCall function
jest.mock('@boundbybetter/shared', () => ({
  logCall: jest.fn(),
}));

describe('useTaskCount', () => {
  beforeEach(() => {
    store.delTables();
    jest.clearAllMocks();
  });

  it('should return the correct number of tasks', () => {
    store.setTable('tasks', {
      '1': { id: '1', title: 'Task 1' },
      '2': { id: '2', title: 'Task 2' },
      '3': { id: '3', title: 'Task 3' },
    });

    const { result } = renderHook(() => useTaskCount());

    expect(result.current).toBe(3);
    expect(logCall).toHaveBeenCalledWith('useTaskCount');
  });

  it('should return 0 when there are no tasks', () => {
    const { result } = renderHook(() => useTaskCount());

    expect(result.current).toBe(0);
    expect(logCall).toHaveBeenCalledWith('useTaskCount');
  });

  it('should update when tasks are added or removed', () => {
    const { result, rerender } = renderHook(() => useTaskCount());

    expect(result.current).toBe(0);

    act(() => {
      store.setRow('tasks', '1', { id: '1', title: 'Task 1' });
    });
    rerender(() => useTaskCount());
    expect(result.current).toBe(1);

    act(() => {
      store.setRow('tasks', '2', { id: '2', title: 'Task 2' });
    });
    rerender(() => useTaskCount());
    expect(result.current).toBe(2);

    act(() => {
      store.delRow('tasks', '1');
    });
    rerender(() => useTaskCount());
    expect(result.current).toBe(1);

    expect(logCall).toHaveBeenCalledTimes(7);
    expect(logCall).toHaveBeenCalledWith('useTaskCount');
  });

  it('should log with caller parameter when provided', () => {
    renderHook(() => useTaskCount(['ParentComponent']));

    expect(logCall).toHaveBeenCalledWith('ParentComponent', 'useTaskCount');
  });

  it('should log with multiple caller parameters when provided', () => {
    renderHook(() => useTaskCount(['GrandparentComponent', 'ParentComponent']));

    expect(logCall).toHaveBeenCalledWith(
      'GrandparentComponent',
      'ParentComponent',
      'useTaskCount',
    );
  });
});
