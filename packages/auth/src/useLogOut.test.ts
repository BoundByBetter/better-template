import { renderHook } from '@testing-library/react-native';
import { useLogOut } from './useLogOut';
import { useAuth } from './useAuth';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { fetchDiscoveryAsync } from 'expo-auth-session';

jest.mock('./useAuth', () => ({
  useAuth: jest.fn(),
}));
jest.mock('expo-auth-session', () => ({
  fetchDiscoveryAsync: jest.fn(),
}));

describe('useLogOut', () => {
  const mockClearCurrentUser = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      clearCurrentUser: mockClearCurrentUser,
    });
  });

  it('should return a function', () => {
    const { result } = renderHook(() => useLogOut());
    expect(typeof result.current).toBe('function');
  });

  it('should call clearCurrentUser when executed', async () => {
    const { result } = renderHook(() => useLogOut());
    await result.current();
    expect(mockClearCurrentUser).toHaveBeenCalledTimes(1);
  });
  it('should redirect to the logout URL', async () => {
    window.location = {
      ...window.location,
      origin: 'https://example.com/home',
    } as Location;
    const mockDiscovery = {
      endSessionEndpoint: 'https://example.com/logout',
    };
    (fetchDiscoveryAsync as jest.Mock).mockResolvedValue(mockDiscovery);
    const { result } = renderHook(() => useLogOut());
    await result.current();
    expect(window.location.href).toBe(
      'https://example.com/logout?post_logout_redirect_uri=https%3A%2F%2Fexample.com%2Fhome',
    );
  });
});
