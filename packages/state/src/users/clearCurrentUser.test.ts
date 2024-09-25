import { store } from '../store';
import { clearCurrentUser } from './clearCurrentUser';
import { User } from '@boundbybetter/shared';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('clearCurrentUser', () => {
  beforeEach(() => {
    store.delTables();
  });

  it('should clear the current user in the store', () => {
    const user: User = {
      userName: 'John Doe',
      userEmail: 'john@example.com',
      groups: ['group1'],
    };
    store.setRow('user', 'current', user as any);

    clearCurrentUser();

    const updatedUser = store.getRow('user', 'current');
    expect(updatedUser).toEqual({});
  });
});
