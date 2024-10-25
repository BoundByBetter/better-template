import { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { User } from './User';

export const useCurrentUser = (): User | undefined => {
  const context = useContext(AuthContext);
  return context?.currentUser ?? undefined;
};
