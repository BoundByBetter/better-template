import React, { useState } from 'react';
import { LogInScreen } from './LogInScreen';
import { logCall } from '@boundbybetter/shared';
import { User } from './User';
import { AuthContext } from './AuthContext';

export const AuthProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  logCall('AuthProvider', currentUser);

  const isLoggedIn = () => {
    return currentUser?.userId !== undefined;
  };

  // Method to clear the current user
  const clearCurrentUser = () => {
    setCurrentUser(null);
    logCall('AuthProvider', 'User cleared from context');
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, clearCurrentUser }}
    >
      {isLoggedIn() ? children : <LogInScreen onLogin={setCurrentUser} />}
    </AuthContext.Provider>
  );
};
