import { createMergeableStore } from 'tinybase';
import { createExpoSqlitePersister } from 'tinybase/persisters/persister-expo-sqlite';
import { createLocalPersister } from 'tinybase/persisters/persister-browser';
import { WsSynchronizer } from 'tinybase/synchronizers/synchronizer-ws-client';
import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';
import { logCall, logError, logMessage } from '@boundbybetter/shared';
import { Persister, Persists } from 'tinybase/persisters';
import { createMetrics } from 'tinybase';
import { createAzureWPSSynchronizer } from './sync/azureWebPubSubSynchronizer';
import { WebPubSubClient } from '@azure/web-pubsub-client';
import { Synchronizer } from 'tinybase/synchronizers';

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
      persister.load().then(() => {
        logCall('store', 'initializePersister', 'persister.load');
        connectToSyncServer();
      });
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
}
let synchronizer: Synchronizer | null = null;
export async function connectToSyncServer() {
  try {
    const user = store.getRow('user', 'current');
    logCall('store', 'connectToSyncServer', 'user', user);
    if (synchronizer) {
      logMessage('store', 'connectToSyncServer', 'Synchronizer already exists');
      return;
    }
    if (!user.accessToken || !user.idToken) {
      logMessage('store', 'connectToSyncServer', 'No access token or id token');
      return;
    }
    logCall(
      'store',
      'connectToSyncServer',
      'authTokenResponse',
      'user.accessToken',
      user.accessToken,
      'user.idToken',
      user.idToken,
    );
    // const authTokenResponse = await fetch(
    //   'https://better-template-api.azurewebsites.net/.auth/login/aad',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       access_token: user.accessToken,
    //       id_token: user.idToken,
    //     }),
    //   },
    // );
    // logCall(
    //   'store',
    //   'connectToSyncServer',
    //   'authTokenResponse',
    //   authTokenResponse,
    // );
    // const authToken = await authTokenResponse.json();
    const negotiateUrl =
      'https://better-template-api.azurewebsites.net/api/negotiate';
    const negotiateResponse = await fetch(negotiateUrl, {
      headers: {
        Authorization: `Bearer ${user.idToken.toString()}`,
        // Authorization: `Bearer ${user.accessToken.toString()}`,
        // 'X-ZUMO-AUTH': user.idToken.toString(),
        // 'X-ZUMO-AUTH': authToken.authenticationToken,
      },
    });
    logCall(
      'store',
      'connectToSyncServer',
      'negotiateResponse',
      negotiateResponse,
    );
    const data = await negotiateResponse.json();

    const wpsClient = new WebPubSubClient(data.url);

    synchronizer = await createAzureWPSSynchronizer(
      store,
      user.userId.toString(),
      wpsClient,
    );

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
  } catch (error) {
    logError(
      error as Error,
      'connectToSyncServer',
      'Error creating WebSocket synchronizer',
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
