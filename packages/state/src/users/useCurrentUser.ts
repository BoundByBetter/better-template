import { useRow } from 'tinybase/ui-react';
import { store } from '../store';
import { User } from '@boundbybetter/shared';

export const useCurrentUser = (): User | undefined => {
  const user = useRow('user', 'current', store);
  return Object.keys(user).length === 0
    ? undefined
    : ({
        id: user.id,
        userName: user.userName,
        userEmail: user.userEmail,
        groups: user.groups ? JSON.parse(user.groups.toString()) : [],
      } as User);
};
