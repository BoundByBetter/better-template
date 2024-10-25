import { act } from '@testing-library/react-native';
import { useTaskCount } from './useTaskCount';
import { createStore } from 'tinybase';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { renderHookWithMockUserStateProvider } from '../renderHookWithMockUserStateProvider.test-util';

describe('useTaskCount', () => {
  let store;

  beforeEach(() => {
    store = createStore();
  });

  it('should return the correct number of tasks', async () => {
    store.setTable('tasks', {
      '1': { id: '1', title: 'Task 1' },
      '2': { id: '2', title: 'Task 2' },
      '3': { id: '3', title: 'Task 3' },
    });
    const target = renderHookWithMockUserStateProvider(store, '1', () =>
      useTaskCount('1'),
    );
    await act(() => {
      expect(target.result.current).toBe(3);
    });
  });

  it('should return 0 when there are no tasks', async () => {
    const target = renderHookWithMockUserStateProvider(store, '1', () =>
      useTaskCount('1'),
    );
    await act(() => {
      expect(target.result.current).toBe(0);
    });
  });

  it('should update when tasks are added or removed', async () => {
    const target = renderHookWithMockUserStateProvider(store, '1', () =>
      useTaskCount('1'),
    );
    await act(() => {
      expect(target.result.current).toBe(0);
    });

    await act(() => {
      store.setRow('tasks', '1', { id: '1', title: 'Task 1' });
      target.rerender(null);
    });
    await act(() => {
      expect(target.result.current).toBe(1);
    });

    await act(() => {
      store.setRow('tasks', '2', { id: '2', title: 'Task 2' });
      target.rerender(null);
    });
    await act(() => {
      expect(target.result.current).toBe(2);
    });

    await act(() => {
      store.delRow('tasks', '1');
      target.rerender(null);
    });
    await act(() => {
      expect(target.result.current).toBe(1);
    });
  });
});
