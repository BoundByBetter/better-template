const { app, output, trigger } = require('@azure/functions');

const wpsMsg = output.generic({
  type: 'webPubSub',
  name: 'actions',
  hub: 'simplechat',
});

const wpsTrigger = trigger.generic({
  type: 'webPubSubTrigger',
  name: 'request',
  hub: 'simplechat',
  eventName: 'message',
  eventType: 'user',
});

app.generic('message', {
  trigger: wpsTrigger,
  extraOutputs: [wpsMsg],
  handler: async (request, context) => {
    const userId = context.triggerMetadata.connectionContext.userId;
    console.log('Received message from user:', userId);
    console.log('Message content:', request.data);

    context.extraOutputs.set(wpsMsg, [
      {
        actionName: 'sendToGroup',
        group: userId,
        data: `[${userId}] ${request.data}`,
        dataType: request.dataType,
      },
      {
        actionName: 'addUserToGroup',
        userId: userId,
        group: userId,
      },
    ]);

    console.log('Message sent to group:', userId);
    return {
      data: '[SYSTEM] Message sent.',
      dataType: 'text',
    };
  },
});
