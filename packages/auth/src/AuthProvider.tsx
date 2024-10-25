import React, { createContext, useContext, useState } from 'react';
import { LogInScreen } from './LogInScreen';
import { logCall } from '@boundbybetter/shared';
import { User } from './User';

interface AuthContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  clearCurrentUser: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
