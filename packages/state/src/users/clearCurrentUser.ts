import { store } from '../store';

export const clearCurrentUser = () => {
  store.delRow('user', 'current');
};
