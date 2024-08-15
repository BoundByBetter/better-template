import { tg } from '@boundbybetter/ui';
import {
  selectUser,
  useAppDispatch,
  useAppSelector,
} from '@boundbybetter/state';
//import { signOut } from "@boundbybetter/backend";
import { userLoggedOut } from '@boundbybetter/shared';

// import { jwtDecode } from 'jwt-decode';

// import * as React from 'react';
// import * as WebBrowser from 'expo-web-browser';
// import {
//   exchangeCodeAsync,
//   makeRedirectUri,
//   useAuthRequest,
//   useAutoDiscovery,
// } from 'expo-auth-session';

// WebBrowser.maybeCompleteAuthSession();

export function Settings() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  async function handleSignOut() {
    //await signOut();
    dispatch(userLoggedOut());
  }

  // Endpoint
  // const discovery = useAutoDiscovery(
  //   'https://login.microsoftonline.com/consumers/v2.0',
  // );
  // const redirectUri = makeRedirectUri({
  //   scheme: undefined,
  //   path: 'auth',
  // });
  // const clientId = '57aeab3d-e5aa-4bf8-9e95-c5d803a39324';

  // // We store the JWT in here
  // const [token, setToken] = React.useState<string | null>(null);

  // // Request
  // const [request, , promptAsync] = useAuthRequest(
  //   {
  //     clientId,
  //     scopes: ['openid', 'profile', 'email', 'offline_access'],
  //     redirectUri,
  //   },
  //   discovery,
  // );

  return (
    <tg.YStack gap="$4" m="$4">
      {/* <Button
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
      >Sign in</Button> */}
      <tg.Text>User Name: {user?.userName}</tg.Text>
      <tg.Text>User Email: {user?.userEmail}</tg.Text>
      <tg.Text>Hello there {user?.userName},</tg.Text>
      <tg.Button onPress={handleSignOut}>Sign Out</tg.Button>
    </tg.YStack>
  );
}
