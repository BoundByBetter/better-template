import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { tg } from '@boundbybetter/ui';
import { logError, logMessage } from '@boundbybetter/shared';
import { JwtPayload, jwtDecode } from 'jwt-decode';

import {
  makeRedirectUri,
  useAutoDiscovery,
  useAuthRequest,
  exchangeCodeAsync,
} from 'expo-auth-session';
import { User } from './User';

WebBrowser.maybeCompleteAuthSession();

// Define a custom interface that extends JwtPayload
interface CustomJwtPayload extends JwtPayload {
  name: string; // Add the expected properties
  email: string; // Add the expected properties
  oid: string;
  upn: string;
}

interface LogInScreenProps {
  onLogin: (user: User) => void;
}

export const LogInScreen = ({ onLogin }: LogInScreenProps) => {
  // const { user, getAccessToken, signIn } = useAuth();

  const theme = tg.useTheme();
  const redirectUri = makeRedirectUri({
    scheme: 'com.boundbybetter.bettertemplate.dev',
    path: 'auth',
  });

  // Endpoint
  const discovery = useAutoDiscovery(
    // 'https://login.microsoftonline.com/0009cc7a-b831-4911-be61-58865b14fccb/v2.0',
    'https://boundbybettercustomers.ciamlogin.com/0009cc7a-b831-4911-be61-58865b14fccb/v2.0',
    // 'https://0009cc7a-b831-4911-be61-58865b14fccb.ciamlogin.com/0009cc7a-b831-4911-be61-58865b14fccb',
    // 'https://login.microsoftonline.com/common/v2.0',
    // 'https://0009cc7a-b831-4911-be61-58865b14fccb.ciamlogin.com/0009cc7a-b831-4911-be61-58865b14fccb/v2.0',
    // 'https://boundbybettercustomers.ciamlogin.com/organizations',
    // 'https://boundbybettercustomers.ciamlogin.com/0009cc7a-b831-4911-be61-58865b14fccb/v2.0',
    // 'https://boundbybettercustomers.ciamlogin.com/common',
  );

  const clientId = 'f9145cf9-4c2e-4cf2-bdff-a63a366754af';

  // Request;
  const [authRequest, authResponse, promptAsync] = useAuthRequest(
    {
      clientId,
      scopes: ['openid', 'profile', 'email', 'offline_access'],
      redirectUri,
    },
    discovery,
  );

  const logIn = async (method: string) => {
    if (method === 'Email') {
      const codeResponse = await promptAsync();
      logMessage('codeResponse', codeResponse);
      if (authRequest && codeResponse?.type === 'success' && discovery) {
        logMessage('response useAuthRequest', authResponse);
        const exchangeCodeResponse = await exchangeCodeAsync(
          {
            clientId,
            code: codeResponse.params.code,
            extraParams: authRequest.codeVerifier
              ? { code_verifier: authRequest.codeVerifier }
              : /* istanbul ignore next */ undefined,
            redirectUri,
            scopes: ['openid', 'profile', 'email', 'offline_access'],
          },
          discovery,
        );
        logMessage('response', exchangeCodeResponse);
        // Get the user id from the idToken.
        const idToken = jwtDecode(
          exchangeCodeResponse.idToken,
        ) as CustomJwtPayload;
        logMessage('idToken', idToken);
        const userInfoResponse = await fetch(discovery.userInfoEndpoint, {
          headers: {
            Authorization: `Bearer ${exchangeCodeResponse.accessToken}`,
          },
        });
        const userInfo = await userInfoResponse.json();
        logMessage('userInfo', userInfo);
        const newUser: User = {
          userId: idToken.oid,
          userName: userInfo.name,
          userEmail: userInfo.email,
          groups: [],
          accessToken: exchangeCodeResponse.accessToken,
          idToken: exchangeCodeResponse.idToken,
        };
        onLogin(newUser); // Update the user in AuthProvider
      }
    } else {
      onLogin(null);
    }
  };
  return (
    <tg.YStack
      padding="$4"
      space="$2"
      testID="app-log-in"
      backgroundColor={theme.background}
      flex={1}
    >
      <tg.H1>Better Template</tg.H1>
      <tg.H3>Log In</tg.H3>
      <tg.Paragraph>Please select a method for logging in.</tg.Paragraph>
      <tg.Button
        width="$14"
        onPress={() => logIn('Email')}
        disabled={!authRequest}
      >
        Email
      </tg.Button>
      <tg.Button
        width="$14"
        onPress={/* istanbul ignore next */ () => logIn('Microsoft')}
      >
        Microsoft
      </tg.Button>
      <tg.Button
        width="$14"
        onPress={/* istanbul ignore next */ () => logIn('Google')}
      >
        Google
      </tg.Button>
      <tg.Button
        width="$14"
        onPress={/* istanbul ignore next */ () => logIn('Facebook')}
      >
        Facebook
      </tg.Button>
    </tg.YStack>
  );
};
