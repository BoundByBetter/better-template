const { app } = require('@azure/functions');
const { WebPubSubServiceClient } = require('@azure/web-pubsub');

const hubName = 'simplechat';

app.http('negotiate', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    let userId;
    context.log('Environment:', process.env.AZURE_FUNCTIONS_ENVIRONMENT);

    // Check if running locally
    if (process.env.AZURE_FUNCTIONS_ENVIRONMENT === 'Development') {
      // If local, get userId from request parameter
      userId = request.query.get('userId') || request.body?.userId;
      context.log('UserId:', userId);
      if (!userId) {
        return { status: 400, body: 'UserId is required when running locally' };
      }
    } else {
      // In Azure, use the original method
      userId = request.headers.get('x-ms-client-principal-name');
      if (!userId) {
        return { status: 401, body: 'Unauthorized' };
      }
    }

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
