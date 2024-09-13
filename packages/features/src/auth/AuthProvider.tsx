import React from 'react';
import { useCurrentUser } from '@boundbybetter/state';
import { LogInScreen } from './LogInScreen';

export interface AuthProviderProps {
  children: JSX.Element;
}

export const AuthProvider = (props: AuthProviderProps) => {
  const user = useCurrentUser();

  // Function to check if the user is logged in
  const isLoggedIn = () => {
    return user?.userEmail !== undefined;
  };

  // Render login screen if user is not logged in
  if (!isLoggedIn()) {
    return <LogInScreen />;
  }

  // Render the app if user is logged in
  return props.children;
};
