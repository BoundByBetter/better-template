import React from 'react';
import { MsalProvider } from '@azure/msal-react';
import {
  Configuration,
  PublicClientApplication,
  RedirectRequest,
} from '@azure/msal-browser';
import { MsalAuthenticationTemplate } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';
import { tg } from '@boundbybetter/ui';

function ErrorComponent({ error }) {
  return <tg.View>An Error Occurred: {error}</tg.View>;
}

function LoadingComponent() {
  return <tg.View>Authentication in progress...</tg.View>;
}

const configuration: Configuration = {
  auth: {
    clientId: 'f9145cf9-4c2e-4cf2-bdff-a63a366754af',
    authority:
      'https://boundbybettercustomers.ciamlogin.com/0009cc7a-b831-4911-be61-58865b14fccb/v2.0',
  },
};

const pca = new PublicClientApplication(configuration);

export interface AuthProviderProps {
  children: JSX.Element;
}

export const AuthProvider = (props: AuthProviderProps) => {
  const authRequest: RedirectRequest = {
    scopes: ['openid', 'profile', 'email', 'offline_access'],
    authority:
      'https://boundbybettercustomers.ciamlogin.com/0009cc7a-b831-4911-be61-58865b14fccb/v2.0',
  };
  return (
    <MsalProvider instance={pca}>
      <MsalAuthenticationTemplate
        interactionType={InteractionType.Redirect}
        authenticationRequest={authRequest}
        errorComponent={ErrorComponent}
        loadingComponent={LoadingComponent}
      >
        {props.children}
      </MsalAuthenticationTemplate>
    </MsalProvider>
  );
};
