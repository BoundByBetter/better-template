const { app } = require('@azure/functions');
const { WebPubSubServiceClient } = require('@azure/web-pubsub');

const hubName = 'simplechat';

app.http('negotiate', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    const userId =
      request.query.get('userId') ||
      request.headers.get('x-ms-client-principal-name') ||
      'anonymous';
    const group = userId;

    const serviceClient = new WebPubSubServiceClient(
      process.env.WebPubSubConnectionString,
      hubName,
    );

    try {
      const token = await serviceClient.getClientAccessToken({
        userId: userId,
        roles: ['webpubsub.sendToGroup', 'webpubsub.joinLeaveGroup'],
        groups: [group],
      });

      context.log('Negotiation request:', { userId, group });
      return { jsonBody: { url: token.url } };
    } catch (error) {
      context.log.error('Error generating token:', error);
      return { status: 500, body: 'Error generating token' };
    }
  },
});
