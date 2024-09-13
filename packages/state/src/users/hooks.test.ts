import { renderHook } from '@testing-library/react-native';
import { useCurrentUser } from './hooks';
import { store } from '../store';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('user hooks', () => {
  beforeEach(() => {
    store.delTables();
  });

  describe('useCurrentUser', () => {
    it('should return the current user from the store', () => {
      store.setTable('user', {
        current: {
          id: 'user1',
          userName: 'John Doe',
          userEmail: 'john@example.com',
          groups: JSON.stringify(['group1', 'group2']),
        },
      });

      const { result } = renderHook(() => useCurrentUser());

      expect(result.current).toEqual({
        id: 'user1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        groups: ['group1', 'group2'],
      });
    });

    it('should return undefined when there is no current user', () => {
      const { result } = renderHook(() => useCurrentUser());

      expect(result.current).toBeUndefined();
    });

    it('should return an empty array when the groups property is not set', () => {
      store.setTable('user', {
        current: {
          id: 'user1',
          userName: 'John Doe',
          userEmail: 'john@example.com',
        },
      });

      const { result } = renderHook(() => useCurrentUser());

      expect(result.current).toEqual({
        id: 'user1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        groups: [],
      });
    });
  });
});
