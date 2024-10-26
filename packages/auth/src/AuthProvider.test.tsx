import React, { useEffect } from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { AuthProvider } from './AuthProvider';
import { Text } from 'react-native';
import { describe, expect, it, beforeEach } from '@jest/globals';
import { useState } from 'react';
import { User } from './User';
import { useAuth } from './useAuth';

jest.mock('./LogInScreen', () => {
  const Text = require('react-native').Text;
  return {
    LogInScreen: jest.fn(({ onLogin }) => (
      <Text testID="login-screen" onPress={() => onLogin({ userId: 'user1' })}>
        Log In Screen
      </Text>
    )),
  };
});

jest.mock('react', () => {
  const React = jest.requireActual('react');
  return {
    ...React,
    useState: jest.fn().mockReturnValue(React.useState),
    // useContext: jest.fn().mockReturnValue(React.useContext),
  };
});

describe('AuthProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children if authenticated', () => {
    const setStateMock = jest.fn();
    const currentUser = {
      userId: 'user1',
      accessToken: 'token1',
      idToken: 'idToken1',
      userEmail: 'mytest',
      userName: 'mytest',
      groups: [],
    };

    // Mock useState to return the currentUser and the setter function
    (useState as jest.Mock).mockImplementation((initialValue) => [
      currentUser,
      setStateMock,
    ]);

    const { getByText } = render(
      <AuthProvider>
        <Text>Child Component</Text>
      </AuthProvider>,
    );

    expect(getByText('Child Component')).toBeTruthy();
  });

  it('renders LogInScreen when user is not logged in', () => {
    // Mock useState to return null for currentUser
    (useState as jest.Mock).mockImplementation((initialValue) => [
      null,
      jest.fn(),
    ]);

    const { getByTestId } = render(
      <AuthProvider>
        <Text>Child Component</Text>
      </AuthProvider>,
    );

    expect(getByTestId('login-screen')).toBeTruthy();
  });

  it('does not render LogInScreen when user is logged in', () => {
    const setStateMock = jest.fn();
    const currentUser = {
      userId: 'user1',
      accessToken: 'token1',
      idToken: 'idToken1',
      userEmail: 'mytest',
      userName: 'mytest',
      groups: [],
    };

    // Mock useState to return the currentUser and the setter function
    (useState as jest.Mock).mockImplementation((initialValue) => [
      currentUser,
      setStateMock,
    ]);

    const { getByText } = render(
      <AuthProvider>
        <Text>Child Component</Text>
      </AuthProvider>,
    );

    expect(getByText('Child Component')).toBeTruthy();
  });
  it('should set the clearCurrentUser function to set the current user to null', async () => {
    let currentUser: User | null = {
      userId: 'user1',
      accessToken: 'token1',
      idToken: 'idToken1',
      userEmail: 'mytest',
      userName: 'mytest',
      groups: [],
    };
    const setStateMock = (user: User | null) => {
      currentUser = user;
    };

    // Mock useState to return the currentUser and the setter function
    (useState as jest.Mock).mockImplementation((initialValue) => [
      currentUser,
      setStateMock,
    ]);
    const ChildComponent = () => {
      const { clearCurrentUser, currentUser } = useAuth();
      useEffect(() => {
        clearCurrentUser();
      }, [clearCurrentUser, currentUser]);
      return <Text>Child Component {currentUser ? 'true' : 'false'}</Text>;
    };
    const { getByText, rerender } = render(
      <AuthProvider>
        <ChildComponent />
      </AuthProvider>,
    );
    await waitFor(() => {
      expect(getByText('Child Component true')).toBeTruthy();
    });
    rerender(
      <AuthProvider>
        <ChildComponent />
      </AuthProvider>,
    );
    await waitFor(() => {
      expect(getByText('Log In Screen')).toBeTruthy();
    });
  });
});
