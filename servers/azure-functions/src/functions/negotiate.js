const { app } = require('@azure/functions');
const { WebPubSubServiceClient } = require('@azure/web-pubsub');

const hubName = 'simplechat';

app.http('negotiate', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous', // Change to 'function' if you want to restrict access
  handler: async (request, context) => {
    let userId;
    context.log('Environment:', process.env.AZURE_FUNCTIONS_ENVIRONMENT);
    try {
      context.log('Request headers:', request.headers);
      // Use Easy Auth to get user information from headers
      userId = request.headers.get('x-ms-client-principal-id');
      context.log('User ID:', userId);
      if (!userId) {
        return {
          status: 401,
          body: 'Unauthorized: No client principal found',
        };
      }

      // Continue with your logic...
      const group = userId;

      const serviceClient = new WebPubSubServiceClient(
        process.env.WebPubSubConnectionString,
        hubName,
      );

      const accessToken = await serviceClient.getClientAccessToken({
        userId: userId,
        roles: ['webpubsub.sendToGroup', 'webpubsub.joinLeaveGroup'],
        groups: [group],
      });

      context.log('Negotiation request:', { userId, group });
      context.res = {
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:8081',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      };
      return { jsonBody: { url: accessToken.url } };
    } catch (error) {
      context.log('Error handling request:', error);
      return { status: 500, body: 'Unexpected error' };
    }
  },
});
