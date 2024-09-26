import { createMergeableStore } from 'tinybase';
import { createExpoSqlitePersister } from 'tinybase/persisters/persister-expo-sqlite';
import { createLocalPersister } from 'tinybase/persisters/persister-browser';
import {
  createWsSynchronizer,
  WsSynchronizer,
} from 'tinybase/synchronizers/synchronizer-ws-client';
import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';
import { logCall, logMessage } from '@boundbybetter/shared';
import { Persister, Persists } from 'tinybase/persisters';
import { createMetrics } from 'tinybase';

export const store = createMergeableStore('my-store').setTables({
  tasks: {},
  features: {},
  user: {},
  app: {
    status: {
      isBulkLoading: false,
      bulkLoadingProgress: 0,
    },
  },
});

logCall('store', 'createMergeableStore');

/* istanbul ignore next */
if (typeof jest === 'undefined') {
  const initializePersister = async () => {
    logCall('store', 'initializePersister', 'Platform.OS', Platform.OS);

    let persister: Persister<Persists.StoreOrMergeableStore>;
    if (Platform.OS === 'web') {
      // Use LocalPersister for web
      persister = createLocalPersister(store, 'myapp_store');
    } else {
      // Use ExpoSqlitePersister for native platforms
      const db = SQLite.openDatabaseSync('myapp.db');
      persister = createExpoSqlitePersister(store, db, 'tinybase_store');
    }

    // Add status listener to log lifecycle events
    persister.addStatusListener((persister, status) => {
      const statusMessage =
        status === 0 ? 'idle' : status === 1 ? 'loading' : 'saving';
      const stats = persister.getStats();
      logCall(
        'store',
        'addStatusListener',
        `Persister status: ${statusMessage}`,
        'stats',
        stats,
      );
    });

    return persister;
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
      logMessage(
        'store',
        'initializePersister',
        'Error creating persister',
        error,
      );
    });

  // Create PartyKit synchronizer
  try {
    createWsSynchronizer(store, new WebSocket('ws://10.24.1.57:8043/myroom'))
      .then(async (synchronizer) => {
        logCall('store', 'createWsSynchronizer', 'Starting sync');
        await synchronizer.startSync();
        synchronizer.addStatusListener((synchronizer, status) => {
          const statusMessage =
            status === 0 ? 'idle' : status === 1 ? 'loading' : 'saving';
          const stats = (
            synchronizer as WsSynchronizer<WebSocket>
          ).getSynchronizerStats();
          logCall(
            'store',
            'addStatusListener',
            `Synchronizer status: ${statusMessage}`,
            'stats',
            stats,
          );
        });
        return synchronizer;
      })
      .catch((error) => {
        logCall(
          'store',
          'createWsSynchronizer',
          'Error creating WebSocket synchronizer',
          error,
        );
      });
  } catch (error) {
    logCall(
      'store',
      'createWsSynchronizer',
      'Error creating WebSocket synchronizer',
      error,
    );
  }
}

store.setCell('app', 'status', 'isBulkLoading', false);
store.setCell('app', 'status', 'bulkLoadingProgress', 0);

// Set up metric definition for task count
export const metrics = createMetrics(store);
metrics.setMetricDefinition(
  'taskCount', // metricId
  'tasks', // tableId to aggregate
  'sum', // aggregation type
  () => 1, // custom aggregator function that always returns 1
);

export type Store = typeof store;
