import { Button, Text, YStack } from "@boundbybetter/ui";
import { selectUser, useAppDispatch, useAppSelector } from "@boundbybetter/state";
//import { signOut } from "@boundbybetter/backend";
import { logRaw, User, userLoggedIn, userLoggedOut } from "@boundbybetter/shared";
import { jwtDecode } from 'jwt-decode';

import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import {
  exchangeCodeAsync,
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
} from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export function Settings() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  async function handleSignOut() {
    //await signOut();
    dispatch(userLoggedOut());
  }

  // Endpoint
  const discovery = useAutoDiscovery(
    'https://login.microsoftonline.com/consumers/v2.0',
  );
  const redirectUri = makeRedirectUri({
    scheme: undefined,
    path: 'auth',
  });
  const clientId = '57aeab3d-e5aa-4bf8-9e95-c5d803a39324';

  // We store the JWT in here
  const [token, setToken] = React.useState<string | null>(null);

  // Request
  const [request, , promptAsync] = useAuthRequest(
    {
      clientId,
      scopes: ['openid', 'profile', 'email', 'offline_access'],
      redirectUri,
    },
    discovery,
  );

  return (
    <YStack gap="$4" m="$4">
      <Button
        disabled={!request}
        onPress={() => {
          promptAsync().then((codeResponse) => {
            if (request && codeResponse?.type === 'success' && discovery) {
              exchangeCodeAsync(
                {
                  clientId,
                  code: codeResponse.params.code,
                  extraParams: request.codeVerifier
                    ? { code_verifier: request.codeVerifier }
                    : undefined,
                  redirectUri,
                },
                discovery,
              ).then((res) => {
                logRaw(res);
                setToken(res.accessToken);
                if (!res.idToken) {
                  return;
                }
                const decoded: any = jwtDecode(res.idToken);
                dispatch(userLoggedIn({
                  userName: decoded.name,
                  userEmail: decoded.email,
                }));
                logRaw(decoded);
              });
            }
          });
        }}
      >Sign in</Button>
      <Text>User Name: {user.userName}</Text>
      <Text>User Email: {user.userEmail}</Text>
      <Text>{token}</Text>
      <Text>Hello there {user?.userName},</Text>
      <Button onPress={handleSignOut}>Sign Out</Button>
    </YStack>
  )
}
