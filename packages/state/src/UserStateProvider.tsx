import { logSetup } from '@boundbybetter/shared';
import { UserSyncProvider } from './UserSyncProvider';
import { UserStoreProvider } from './UserStoreProvider';
import { UserPersistenceProvider } from './UserPersistenceProvider';

export interface UserStateProviderProps {
  children: JSX.Element;
}

export const UserStateProvider = (props: UserStateProviderProps) => {
  logSetup('UserStateProvider');
  return (
    <UserStoreProvider>
      <UserPersistenceProvider>
        <UserSyncProvider>{props.children}</UserSyncProvider>
      </UserPersistenceProvider>
    </UserStoreProvider>
  );
};
