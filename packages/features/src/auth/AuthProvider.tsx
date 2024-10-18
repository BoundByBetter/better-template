import React from 'react';
import { useCurrentUser } from '@boundbybetter/state';
import { LogInScreen } from './LogInScreen';
import { logCall } from '@boundbybetter/shared';

export interface AuthProviderProps {
  children: JSX.Element;
}

export const AuthProvider = (props: AuthProviderProps) => {
  const user = useCurrentUser();
  logCall('AuthProvider', user);

  // Function to check if the user is logged in
  const isLoggedIn = () => {
    return user?.userId !== undefined;
  };

  // Render the app if user is logged in
  return isLoggedIn() ? props.children : <LogInScreen />;
};
