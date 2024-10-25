import type { Message, Receive, Send } from 'tinybase/synchronizers';
import type { IdOrNull } from 'tinybase/common';
import { MergeableStore } from 'tinybase/mergeable-store';
import { createCustomSynchronizer } from 'tinybase/synchronizers';
import { WebPubSubClient } from '@azure/web-pubsub-client';
import { logCall } from '@boundbybetter/shared';

export const createAzureWPSSynchronizer = async <
  WPSClient extends WebPubSubClient,
>(
  store: MergeableStore,
  userId: string,
  webPubSubClient: WPSClient,
  requestTimeoutSeconds: number = 1,
  onSend?: Send,
  onReceive?: Receive,
  onIgnoredError?: (error: any) => void,
) => {
  store.addRowCountListener('Tasks', (rowCount) => {
    logCall('createAzureWPSSynchronizer', 'Row count', rowCount);
  });
  logCall('createAzureWPSSynchronizer', 'Initializing synchronizer');

  // Event listeners for the WebPubSubClient
  webPubSubClient.on('connected', (event) => {
    logCall('createAzureWPSSynchronizer', 'Connected to WebPubSub', event);
  });

  webPubSubClient.on('disconnected', (event) => {
    logCall('createAzureWPSSynchronizer', 'Disconnected from WebPubSub', event);
  });

  webPubSubClient.on('server-message', (event) => {
    logCall('createAzureWPSSynchronizer', 'Received server message', event);
  });

  webPubSubClient.on('rejoin-group-failed', (event) => {
    logCall('createAzureWPSSynchronizer', 'Failed to rejoin group', event);
  });

  const send = (
    toClientId: IdOrNull,
    requestId: IdOrNull,
    message: Message,
    body: any,
  ): void => {
    logCall('createAzureWPSSynchronizer', 'Sending message', {
      toClientId,
      requestId,
      message,
      body,
    });
    webPubSubClient.sendToGroup(
      userId,
      { toClientId, requestId, message, body },
      'json',
    );
  };

  const registerReceive = (receive: Receive): void => {
    webPubSubClient.on('group-message', (event) => {
      const { toClientId, requestId, message, body } = event.message.data as {
        toClientId: string;
        requestId: string;
        message: Message;
        body: any;
      };
      logCall('createAzureWPSSynchronizer', 'Received group message', event);
      receive(toClientId, requestId, message, body);
    });
  };

  const destroy = (): void => {
    logCall('createAzureWPSSynchronizer', 'Destroying synchronizer');
    webPubSubClient.stop();
  };

  const synchronizer = createCustomSynchronizer(
    store,
    send,
    registerReceive,
    destroy,
    requestTimeoutSeconds,
    onSend,
    onReceive,
    onIgnoredError,
  );

  await webPubSubClient.start();
  logCall('createAzureWPSSynchronizer', 'WebPubSubClient started');
  await webPubSubClient.joinGroup(userId);
  logCall('createAzureWPSSynchronizer', 'Joined group', userId);

  return synchronizer;
};
