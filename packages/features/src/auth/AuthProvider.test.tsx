import React from 'react';
import { render } from '@testing-library/react-native';
import { AuthProvider } from './AuthProvider';
import { Text } from 'react-native';
import { describe, expect, it } from '@jest/globals';
import { useAppSelector } from '@boundbybetter/state';
import { User } from '@boundbybetter/shared';

jest.mock('@boundbybetter/state');
jest.mock('./LogInScreen', () => {
  const Text = require('react-native').Text;
  return {
    LogInScreen: () => <Text testID="login-screen">Log In Screen</Text>,
  };
});

describe('AuthProvider', () => {
  it('renders children if authenticated', () => {
    const user: User = {
      userEmail: 'mytest',
      userName: 'mytest',
      groups: [],
    };
    (useAppSelector as unknown as jest.Mock).mockReturnValue(user);
    const { getByText } = render(
      <AuthProvider>
        <Text>Child Component</Text>
      </AuthProvider>,
    );

    expect(getByText('Child Component')).toBeTruthy();
  });

  it('renders LogInScreen when user is not logged in', () => {
    const user: User = {
      userEmail: null,
      userName: null,
      groups: [],
    };
    (useAppSelector as unknown as jest.Mock).mockReturnValue(user);

    const { getByTestId } = render(
      <AuthProvider>
        <Text>Child Component</Text>
      </AuthProvider>,
    );

    expect(getByTestId('login-screen')).toBeTruthy();
  });

  it('does not render LogInScreen when user is logged in', () => {
    const user: User = {
      userEmail: 'mytest',
      userName: 'mytest',
      groups: [],
    };
    (useAppSelector as unknown as jest.Mock).mockReturnValue(user);

    const { getByText } = render(
      <AuthProvider>
        <Text>Child Component</Text>
      </AuthProvider>,
    );

    expect(getByText('Child Component')).toBeTruthy();
  });
});
