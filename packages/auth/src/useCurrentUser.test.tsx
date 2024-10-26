import { renderHook } from '@testing-library/react-native';
import { useCurrentUser } from './useCurrentUser';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { AuthContext } from './AuthContext';

const mockSetCurrentUser = jest.fn();
const mockClearCurrentUser = jest.fn();

const mockAuthContextValue = {
  currentUser: null,
  setCurrentUser: mockSetCurrentUser,
  clearCurrentUser: mockClearCurrentUser,
};

describe('useCurrentUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the current user from the context', () => {
    mockAuthContextValue.currentUser = {
      id: 'user1',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      groups: ['group1', 'group2'],
    };

    const wrapper = ({ children }) => (
      <AuthContext.Provider value={mockAuthContextValue}>
        {children}
      </AuthContext.Provider>
    );

    const { result } = renderHook(() => useCurrentUser(), { wrapper });

    expect(result.current).toEqual({
      id: 'user1',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      groups: ['group1', 'group2'],
    });
  });

  it('should return undefined when there is no current user', () => {
    mockAuthContextValue.currentUser = null;
    const wrapper = ({ children }) => (
      <AuthContext.Provider value={mockAuthContextValue}>
        {children}
      </AuthContext.Provider>
    );

    const { result } = renderHook(() => useCurrentUser(), { wrapper });

    expect(result.current).toBeUndefined();
  });

  it('should return an empty array when the groups property is not set', () => {
    mockAuthContextValue.currentUser = {
      id: 'user1',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      groups: [],
    };

    const wrapper = ({ children }) => (
      <AuthContext.Provider value={mockAuthContextValue}>
        {children}
      </AuthContext.Provider>
    );

    const { result } = renderHook(() => useCurrentUser(), { wrapper });

    expect(result.current).toEqual({
      id: 'user1',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      groups: [],
    });
  });

  it('should return undefined when the current user is not set', () => {
    mockAuthContextValue.currentUser = null;
    const wrapper = ({ children }) => (
      <AuthContext.Provider value={mockAuthContextValue}>
        {children}
      </AuthContext.Provider>
    );

    const { result } = renderHook(() => useCurrentUser(), { wrapper });

    expect(result.current).toBeUndefined();
  });
});
