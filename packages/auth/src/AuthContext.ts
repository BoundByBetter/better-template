import { createContext } from 'react';
import { User } from './User';

export interface AuthContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  clearCurrentUser: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
