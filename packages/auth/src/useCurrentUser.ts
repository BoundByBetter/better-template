import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { User } from './User';

export const useCurrentUser = (): User | undefined => {
  const context = useContext(AuthContext);
  return context?.currentUser ?? undefined;
};
