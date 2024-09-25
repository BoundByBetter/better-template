import { store } from '../store';
import { updateCurrentUser } from './updateCurrentUser';
import { User } from '@boundbybetter/shared';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('updateCurrentUser', () => {
  beforeEach(() => {
    store.delTables();
  });

  it('should update the current user in the store', () => {
    const user: User = {
      userName: 'John Doe',
      userEmail: 'john@example.com',
      groups: ['group1'],
    };
    store.setRow('user', 'current', user as any);

    const updates: Partial<User> = {
      userName: 'Jane Doe',
      groups: ['group1', 'group2'],
    };
    updateCurrentUser(updates);

    const updatedUser = store.getRow('user', 'current');
    expect(updatedUser).toEqual({ ...user, ...updates });
  });
});
