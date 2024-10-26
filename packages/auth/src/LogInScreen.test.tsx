import { fireEvent, screen, waitFor } from '@testing-library/react-native';
import { LogInScreen } from './LogInScreen';
import { renderWithTamagui } from './renderWithTamagui.test-util';
import { describe, expect, it } from '@jest/globals';
import '@testing-library/jest-native/extend-expect';
import { User } from './User';
import { exchangeCodeAsync, useAuthRequest } from 'expo-auth-session';
import { jwtDecode } from 'jwt-decode';

// Mock expo-auth-session
jest.mock('expo-auth-session', () => ({
  makeRedirectUri: jest.fn().mockReturnValue('http://localhost:8080'),
  useAutoDiscovery: jest.fn().mockReturnValue({
    authorizationEndpoint: 'https://some-endpoint.com/auth',
    tokenEndpoint: 'https://some-endpoint.com/token',
    userInfoEndpoint: 'https://some-endpoint.com/userinfo',
  }),
  useAuthRequest: jest.fn().mockReturnValue([null, null, jest.fn()]),
  exchangeCodeAsync: jest.fn().mockReturnValue({
    accessToken: 'accessToken1',
    idToken: 'idToken1',
    refreshToken: 'refreshToken1',
  }),
}));

jest.mock('jwt-decode', () => ({
  ...jest.requireActual('jwt-decode'),
  jwtDecode: jest.fn().mockReturnValue({ userId: 'user1' }),
}));

const fetchMock = jest.spyOn(global, 'fetch');

beforeEach(() => {
  fetchMock.mockImplementation(
    () =>
      Promise.resolve({
        json: () => Promise.resolve({ data: 'mocked data' }),
      }) as Promise<Response>,
  );
});

afterEach(() => {
  fetchMock.mockClear(); // Clear mock calls after each test
});

describe('LogInScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the login options', () => {
    const onLogin = jest.fn();
    const { getByText, getByTestId } = renderWithTamagui(
      <LogInScreen onLogin={onLogin} />,
    );

    expect(getByTestId('app-log-in')).toBeTruthy();
    expect(getByText('Better Template')).toBeTruthy();
    expect(getByText('Log In')).toBeTruthy();
    expect(getByText('Please select a method for logging in.')).toBeTruthy();
    expect(getByText('Email')).toBeTruthy();
    expect(getByText('Microsoft')).toBeTruthy();
    expect(getByText('Google')).toBeTruthy();
    expect(getByText('Facebook')).toBeTruthy();
  });

  it('should prompt the user to login when the Email button is clicked', async () => {
    const promptAsyncMock = jest.fn();
    (useAuthRequest as jest.Mock).mockReturnValue([
      null,
      null,
      promptAsyncMock,
    ]);
    const onLogin = jest.fn();
    renderWithTamagui(<LogInScreen onLogin={onLogin} />);
    const microsoftButton = screen.getByText('Email');
    fireEvent.press(microsoftButton);
    expect(promptAsyncMock).toHaveBeenCalled();
  });

  it('should call onLogin with null if the login method is invalid', () => {
    const onLogin = jest.fn();
    renderWithTamagui(<LogInScreen onLogin={onLogin} />);
    const microsoftButton = screen.getByText('Microsoft');
    fireEvent.press(microsoftButton);
    expect(onLogin).toHaveBeenCalledWith(null);
  });

  it('should call updateCurrentUser with correct data when successful login with Email', async () => {
    const promptAsyncMock = jest.fn().mockReturnValue({
      type: 'success',
      params: { code: 'code1' },
    });
    const authRequestMock = { codeVerifier: 'codeVerifier1' };
    (useAuthRequest as jest.Mock).mockReturnValue([
      authRequestMock,
      null,
      promptAsyncMock,
    ]);
    const exchangeCodeResponseMock = {
      accessToken: 'token1',
      idToken: 'idToken1',
      refreshToken: 'refreshToken1',
    };
    (exchangeCodeAsync as jest.Mock).mockReturnValue(exchangeCodeResponseMock);
    const idTokenMock = {
      oid: 'user1',
    };
    (jwtDecode as jest.Mock).mockReturnValue(idTokenMock);
    fetchMock.mockClear();
    fetchMock.mockImplementation(
      () =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              name: 'Test User',
              email: 'testuser@boundbybetter.com',
            }),
        }) as Promise<Response>,
    );
    const onLogin = jest.fn();
    renderWithTamagui(<LogInScreen onLogin={onLogin} />);
    const microsoftButton = screen.getByText('Email');
    fireEvent.press(microsoftButton);

    const expectedUser: User = {
      userId: 'user1',
      accessToken: 'token1',
      idToken: 'idToken1',
      userName: 'Test User',
      userEmail: 'testuser@boundbybetter.com',
      groups: [],
    };

    // Wait for the async operation to complete
    await waitFor(() => {
      expect(onLogin).toHaveBeenCalledWith(expectedUser);
    });
  });
});
