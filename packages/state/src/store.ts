import { createMergeableStore } from 'tinybase';
import { createExpoSqlitePersister } from 'tinybase/persisters/persister-expo-sqlite';
import { createLocalPersister } from 'tinybase/persisters/persister-browser';
import { createWsSynchronizer } from 'tinybase/synchronizers/synchronizer-ws-client';
import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';
import { logCall, logMessage } from '@boundbybetter/shared';

export const store = createMergeableStore('my-store').setTables({
  posts: {},
  features: {},
  user: {},
});

logCall('store', 'createMergeableStore');

/* istanbul ignore next */
if (typeof jest === 'undefined') {
  const initializePersister = async () => {
    logCall('store', 'initializePersister');
    logMessage('Platform.OS', Platform.OS);

    if (Platform.OS === 'web') {
      // Use LocalPersister for web
      return createLocalPersister(store, 'myapp_store');
    } else {
      // Use ExpoSqlitePersister for native platforms
      const db = SQLite.openDatabaseSync('myapp.db');
      return createExpoSqlitePersister(store, db, 'tinybase_store');
    }
  };

  // Initialize persister
  initializePersister()
    .then((persister) => {
      logCall('store', 'initializePersister', 'startAuto');
      persister.startAutoLoad();
      persister.startAutoSave();
      return persister;
    })
    .catch((error) => {
      logMessage('Error creating WebSocket synchronizer', error);
    });

  // Create PartyKit synchronizer
  try {
    createWsSynchronizer(store, new WebSocket('ws://localhost:8043/myroom'))
      .then(async (synchronizer) => {
        logMessage('Starting sync');
        await synchronizer.startSync();
        return synchronizer;
      })
      .catch((error) => {
        logMessage('Error creating WebSocket synchronizer', error);
      });
  } catch (error) {
    logMessage('Error creating WebSocket synchronizer', error);
  }
}

export type Store = typeof store;
