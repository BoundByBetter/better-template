import { store } from '../store';
import { User } from '@boundbybetter/shared';

export const updateCurrentUser = (updates: Partial<User>) => {
  store.setPartialRow('user', 'current', updates as any);
};

export const clearCurrentUser = () => {
  store.delRow('user', 'current');
};
