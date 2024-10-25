import React from 'react';
import { render } from '@testing-library/react-native';
import { AuthProvider } from './AuthProvider';
import { Text } from 'react-native';
import { describe, expect, it, beforeEach } from '@jest/globals';
import { User } from './User';
import { useState } from 'react';

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

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

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
});
