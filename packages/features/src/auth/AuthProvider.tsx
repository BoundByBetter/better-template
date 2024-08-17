import React from 'react';
import { selectUser, useAppSelector } from '@boundbybetter/state';
import { LogInScreen } from './LogInScreen';

export interface AuthProviderProps {
  children: JSX.Element;
}
export const AuthProvider = (props: AuthProviderProps) => {
  const user = useAppSelector(selectUser);

  // Function to check if the user is logged in
  const isLoggedIn = () => {
    return user.userEmail !== null;
  };

  // Render login screen if user is not logged in
  if (!isLoggedIn()) {
    return <LogInScreen />;
  }

  // Render the app if user is logged in
  return props.children;
};
