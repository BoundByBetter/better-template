import { logCall, logMessage, logSetup } from '@boundbybetter/shared';
import { useCreateSynchronizer } from 'tinybase/ui-react';
import { WebPubSubClient } from '@azure/web-pubsub-client';
import { createAzureWPSSynchronizer } from './sync/azureWebPubSubSynchronizer';
import { useCurrentUser } from '@boundbybetter/auth';
import { useUserStore } from './useUserStore';
export interface UserSyncProviderProps {
  children: JSX.Element;
}

export const UserSyncProvider = (props: UserSyncProviderProps) => {
  logSetup('UserSyncProvider');
  const user = useCurrentUser();
  const store = useUserStore();
  // Synchronization logic
  useCreateSynchronizer(
    store,
    async (store) => {
      logCall(
        'UserSyncProvider',
        'useCreateSynchronizer',
        'user.idToken',
        user.idToken,
      );
      if (!user.idToken) {
        logMessage(
          'UserSyncProvider',
          'useCreateSynchronizer',
          'No access token or id token',
        );
        return;
      }
      const negotiateUrl =
        'https://better-template-api.azurewebsites.net/api/negotiate';
      const negotiateResponse = await fetch(negotiateUrl, {
        headers: {
          Authorization: `Bearer ${user.idToken}`,
        },
      });
      logCall(
        'UserSyncProvider',
        'useCreateSynchronizer',
        'negotiateResponse',
        negotiateResponse,
      );
      const data = await negotiateResponse.json();

      const wpsClient = new WebPubSubClient(data.url);

      const synchronizer = await createAzureWPSSynchronizer(
        store,
        user.userId.toString(),
        wpsClient,
      );

      synchronizer.addStatusListener((synchronizer, status) => {
        const statusMessage =
          status === 0 ? 'idle' : status === 1 ? 'loading' : 'saving';
        logCall(
          'UserSyncProvider',
          'addStatusListener',
          `Synchronizer status: ${statusMessage}`,
        );
      });

      await synchronizer.startSync();

      return synchronizer;
    },
    [user, store],
  );

  return props.children;
};
