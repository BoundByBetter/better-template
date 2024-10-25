import { logCall } from '@boundbybetter/shared';
import { Platform } from 'react-native';
import { Persister, Persists } from 'tinybase/persisters';
import { createLocalPersister } from 'tinybase/persisters/persister-browser';
import * as SQLite from 'expo-sqlite';
import { createExpoSqlitePersister } from 'tinybase/persisters/persister-expo-sqlite';
import { useCreatePersister } from 'tinybase/ui-react';
import { useUserStore } from './useUserStore';
import { useCurrentUser } from '@boundbybetter/auth';

export interface UserPersistenceProviderProps {
  children: JSX.Element;
}

export const UserPersistenceProvider = (
  props: UserPersistenceProviderProps,
) => {
  logCall('UserPersistenceProvider');
  const user = useCurrentUser();
  const store = useUserStore();
  useCreatePersister(
    store,
    (store) => {
      logCall(
        'UserPersistenceProvider',
        'initializePersister',
        'Platform.OS',
        Platform.OS,
      );

      let persister: Persister<Persists.StoreOrMergeableStore>;
      if (Platform.OS === 'web') {
        // Use LocalPersister for web
        persister = createLocalPersister(store, user.userId.toString());
      } else {
        // Use ExpoSqlitePersister for native platforms
        const db = SQLite.openDatabaseSync(user.userId.toString());
        persister = createExpoSqlitePersister(
          store,
          db,
          user.userId.toString(),
        );
      }

      // Add status listener to log lifecycle events
      persister.addStatusListener((persister, status) => {
        const statusMessage =
          status === 0 ? 'idle' : status === 1 ? 'loading' : 'saving';
        const stats = persister.getStats();
        logCall(
          'UserPersistenceProvider',
          'addStatusListener',
          `Persister status: ${statusMessage}`,
          'stats',
          stats,
        );
      });

      return persister;
    },
    [store, user],
    async (persister) => {
      logCall('UserPersistenceProvider', 'initializePersister', 'startAuto');
      await persister.startAutoLoad();
      await persister.startAutoSave();
    },
  );

  return props.children;
};
