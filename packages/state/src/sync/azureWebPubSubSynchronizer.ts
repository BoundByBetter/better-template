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
  logCall('createAzureWPSSynchronizer');
  webPubSubClient.on('connected', (event) => {
    logCall(
      'createAzureWPSSynchronizer',
      'webPubSubClient.on',
      'connected',
      event,
    );
  });
  webPubSubClient.on('disconnected', (event) => {
    logCall(
      'createAzureWPSSynchronizer',
      'webPubSubClient.on',
      'disconnected',
      event,
    );
  });
  webPubSubClient.on('server-message', (event) => {
    logCall(
      'createAzureWPSSynchronizer',
      'webPubSubClient.on',
      'server-message',
      event,
    );
  });
  webPubSubClient.on('rejoin-group-failed', (event) => {
    logCall(
      'createAzureWPSSynchronizer',
      'webPubSubClient.on',
      'rejoin-group-failed',
      event,
    );
  });

  const send = (
    toClientId: IdOrNull,
    requestId: IdOrNull,
    message: Message,
    body: any,
  ): void => {
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
      logCall(
        'createAzureWPSSynchronizer',
        'webPubSubClient.on',
        'group-message',
        event,
      );
      receive(toClientId, requestId, message, body);
    });
  };

  const destroy = (): void => {
    logCall('createAzureWPSSynchronizer', 'destroy');
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
  await webPubSubClient.joinGroup(userId);

  return synchronizer;
};
