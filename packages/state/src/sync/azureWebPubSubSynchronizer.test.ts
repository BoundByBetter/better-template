import { WebPubSubClient } from '@azure/web-pubsub-client';
import { createAzureWPSSynchronizer } from './azureWebPubSubSynchronizer';
import { logCall } from '@boundbybetter/shared';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { MergeableStore } from 'tinybase/mergeable-store';
import { createCustomSynchronizer, Message } from 'tinybase/synchronizers';
import { IdOrNull } from 'tinybase/common';

type MockSynchronizer = {
  send: (
    toClientId: IdOrNull,
    requestId: IdOrNull,
    message: Message,
    body: any,
  ) => void;
  registerReceive: (
    receive: (
      toClientId: IdOrNull,
      requestId: IdOrNull,
      message: Message,
      body: any,
    ) => void,
  ) => void;
  destroy: () => void;
};

jest.mock('tinybase/synchronizers', () => ({
  ...jest.requireActual('tinybase/synchronizers'),
  // create a mock createCustomSynchronizer that returns a mock synchronizer
  // mock the inputs to createCustomSynchronizer to ensure they are called with the right arguments
  createCustomSynchronizer: jest.fn().mockImplementation(
    async (...args): Promise<MockSynchronizer> => ({
      send: (
        toClientId: IdOrNull,
        requestId: IdOrNull,
        message: Message,
        body: any,
      ) => {
        args[1](toClientId, requestId, message, body);
      },
      registerReceive: (
        receive: (
          toClientId: IdOrNull,
          requestId: IdOrNull,
          message: Message,
          body: any,
        ) => void,
      ) => {
        args[2](receive);
      },
      destroy: () => {
        args[3]();
      },
    }),
  ),
}));

jest.mock('@boundbybetter/shared', () => ({
  logCall: jest.fn(),
}));
describe('createAzureWPSSynchronizer', () => {
  const store = { addRowCountListener: jest.fn() } as unknown as MergeableStore;
  const registeredEvents = [];
  const onEvent = (eventType: string, event: any) => {
    registeredEvents.push({ eventType, event });
  };
  const webPubSubClient = {
    sendEvent: (type: string, event: any) => {
      registeredEvents
        .filter((e) => e.eventType === type)
        .forEach((e) => e.event(event));
    },
    on: onEvent,
    sendToGroup: jest.fn(),
    start: jest.fn(),
    joinGroup: jest.fn(),
    stop: jest.fn(),
  } as unknown as WebPubSubClient;
  const userId = 'userId';

  beforeEach(() => {
    jest.clearAllMocks();
    // clear the registered events
    registeredEvents.splice(0, registeredEvents.length);
  });

  it('should create a new synchronizer using the custom synchronizer', () => {
    createAzureWPSSynchronizer(store, userId, webPubSubClient);
    expect(createCustomSynchronizer).toHaveBeenCalledWith(
      store,
      expect.any(Function),
      expect.any(Function),
      expect.any(Function),
      1,
      undefined,
      undefined,
      undefined,
    );
  });

  it('should wire up the send event from the synchronizer to send to the users group in the web pub sub client', async () => {
    const synchronizer = await createAzureWPSSynchronizer(
      store,
      userId,
      webPubSubClient,
    );
    (synchronizer as unknown as MockSynchronizer).send(
      'clientId',
      'requestId',
      Message.ContentDiff,
      'json',
    );

    expect(webPubSubClient.sendToGroup).toHaveBeenCalledWith(
      userId,
      {
        toClientId: 'clientId',
        requestId: 'requestId',
        message: Message.ContentDiff,
        body: 'json',
      },
      'json',
    );
  });

  it('should wire up the receive event from the web pub sub client to the synchronizer', async () => {
    const synchronizer = await createAzureWPSSynchronizer(
      store,
      userId,
      webPubSubClient,
    );
    const receive = jest.fn();
    (synchronizer as unknown as MockSynchronizer).registerReceive(receive);
    webPubSubClient.sendEvent(
      'group-message',
      {
        message: {
          data: {
            toClientId: 'clientId',
            requestId: 'requestId',
            message: Message.ContentDiff,
            body: 'json',
          },
        },
      },
      'json',
    );
    expect(receive).toHaveBeenCalledWith(
      'clientId',
      'requestId',
      Message.ContentDiff,
      'json',
    );
  });

  it('should stop the web pub sub client when the synchronizer is destroyed', async () => {
    const synchronizer = await createAzureWPSSynchronizer(
      store,
      userId,
      webPubSubClient,
    );
    (synchronizer as unknown as MockSynchronizer).destroy();
    expect(webPubSubClient.stop).toHaveBeenCalled();
  });

  it('should start the web pub sub client and join the users group before returning the synchronizer', async () => {
    const synchronizer = await createAzureWPSSynchronizer(
      store,
      userId,
      webPubSubClient,
    );
    expect(webPubSubClient.start).toHaveBeenCalled();
    expect(webPubSubClient.joinGroup).toHaveBeenCalledWith(userId);
    expect(synchronizer).toBeDefined();
  });

  it('should log the connected, disconnected, server-message, rejoin-group-failed, and rejoin-group-success events', () => {
    createAzureWPSSynchronizer(store, userId, webPubSubClient);
    (logCall as jest.Mock).mockClear();
    webPubSubClient.sendEvent('connected', {}, 'json');
    webPubSubClient.sendEvent('disconnected', {}, 'json');
    webPubSubClient.sendEvent('server-message', {}, 'json');
    webPubSubClient.sendEvent('rejoin-group-failed', {}, 'json');
    expect(logCall).toHaveBeenCalledTimes(4);
  });
});
