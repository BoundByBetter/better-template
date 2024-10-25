import { logCall, logMessage } from '@boundbybetter/shared';
import { useCurrentUser } from '@boundbybetter/auth';
import { createMergeableStore, MergeableStore } from 'tinybase/mergeable-store';
import {
  Provider,
  useCreateMergeableStore,
  useCreateMetrics,
} from 'tinybase/ui-react';
import { createMetrics } from 'tinybase/metrics';

export interface UserStoreProviderProps {
  children: JSX.Element;
  testStore?: MergeableStore;
  testUserId?: string;
}

export const UserStoreProvider = (props: UserStoreProviderProps) => {
  logCall('UserStoreProvider');
  const prodUser = useCurrentUser();
  const user = props.testUserId ? { userId: props.testUserId } : prodUser;
  const store = useCreateMergeableStore(() => {
    if (!user) return null; // Handle case where user is not logged in
    logMessage(
      'UserStoreProvider',
      'useCreateMergeableStore',
      'user.userId',
      user.userId,
    );
    const prodStore = createMergeableStore(user.userId);
    const store = props.testStore || prodStore;
    return store;
  }, [user]); // Create store for the user

  const metrics = useCreateMetrics(store, (store) => {
    const metrics = createMetrics(store);
    metrics.setMetricDefinition(
      'taskCount', // metricId
      'tasks', // tableId to aggregate
      'sum', // aggregation type
      () => 1, // custom aggregator function that always returns 1
    );
    return metrics;
  });

  return (
    <Provider
      storesById={{ [user.userId]: store }}
      metricsById={{ [user.userId]: metrics }}
    >
      {props.children}
    </Provider>
  );
};
