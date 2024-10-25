import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { Settings } from './Settings';
import {
  useClearAllTasks,
  useTaskCount,
  useBulkLoadStatus,
} from '@boundbybetter/state';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';
import { describe, it, expect } from '@jest/globals';
import { useCurrentUser, useLogOut } from '@boundbybetter/auth';

jest.mock('@boundbybetter/state', () => ({
  useClearAllTasks: jest.fn(),
  useTaskCount: jest.fn(),
  useBulkAddTasks: jest.fn(),
  useBulkLoadStatus: jest.fn(),
}));

jest.mock('@boundbybetter/auth', () => ({
  useCurrentUser: jest.fn(),
  useLogOut: jest.fn(),
}));

describe('Settings', () => {
  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NODE_ENV = 'development';
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
  });

  // eslint-disable-next-line prettier/prettier
  it('should render the user\'s name and email', () => {
    (useCurrentUser as jest.Mock).mockReturnValue({
      userName: 'John Doe',
      userEmail: 'john@example.com',
    });
    (useTaskCount as jest.Mock).mockReturnValue(10);
    (useBulkLoadStatus as jest.Mock).mockReturnValue({
      isBulkLoading: false,
      bulkLoadingProgress: 0,
    });

    const { getByText } = renderWithTamagui(<Settings />);
    expect(getByText('User Name: John Doe')).toBeTruthy();
    expect(getByText('User Email: john@example.com')).toBeTruthy();
    expect(getByText('Hello there John Doe,')).toBeTruthy();
  });

  it('should call logOut when the sign out button is pressed', () => {
    (useCurrentUser as jest.Mock).mockReturnValue({
      userName: 'John Doe',
      userEmail: 'john@example.com',
    });
    (useTaskCount as jest.Mock).mockReturnValue(10);
    (useBulkLoadStatus as jest.Mock).mockReturnValue({
      isBulkLoading: false,
      bulkLoadingProgress: 0,
    });
    const logOutMock = jest.fn();
    (useLogOut as jest.Mock).mockImplementation(() => logOutMock);

    const { getByText } = renderWithTamagui(<Settings />);
    const signOutButton = getByText('Log Out');
    fireEvent.press(signOutButton);
    expect(logOutMock).toHaveBeenCalled();
  });

  it('should call clearAllTasks when the clear all tasks button is pressed', () => {
    (useCurrentUser as jest.Mock).mockReturnValue({
      userName: 'John Doe',
      userEmail: 'john@example.com',
    });
    (useTaskCount as jest.Mock).mockReturnValue(10);
    (useBulkLoadStatus as jest.Mock).mockReturnValue({
      isBulkLoading: false,
      bulkLoadingProgress: 0,
    });
    const clearAllTasksMock = jest.fn();
    (useClearAllTasks as jest.Mock).mockImplementation(() => clearAllTasksMock);

    const { getByTestId } = renderWithTamagui(<Settings />);
    const clearAllTasksButton = getByTestId('clear-all-tasks');
    fireEvent.press(clearAllTasksButton);
    expect(clearAllTasksMock).toHaveBeenCalled();
  });

  it('should display the correct number of tasks', () => {
    (useCurrentUser as jest.Mock).mockReturnValue({
      userName: 'John Doe',
      userEmail: 'john@example.com',
    });
    (useTaskCount as jest.Mock).mockReturnValue(10);
    (useBulkLoadStatus as jest.Mock).mockReturnValue({
      isBulkLoading: false,
      bulkLoadingProgress: 0,
    });

    const { getByText } = renderWithTamagui(<Settings />);
    expect(getByText('Clear All 10 Tasks')).toBeTruthy();
  });

  it('should render bulk loading progress when isBulkLoading is true', () => {
    (useCurrentUser as jest.Mock).mockReturnValue({
      userName: 'John Doe',
      userEmail: 'john@example.com',
    });
    (useTaskCount as jest.Mock).mockReturnValue(10);
    (useBulkLoadStatus as jest.Mock).mockReturnValue({
      isBulkLoading: true,
      bulkLoadingProgress: 50,
    });

    const { getByText } = renderWithTamagui(<Settings />);
    expect(getByText('Loading tasks... 50%')).toBeTruthy();
  });

  it('should render BulkAddButton components when not bulk loading and in development mode', () => {
    (useCurrentUser as jest.Mock).mockReturnValue({
      userName: 'John Doe',
      userEmail: 'john@example.com',
    });
    (useTaskCount as jest.Mock).mockReturnValue(10);
    (useBulkLoadStatus as jest.Mock).mockReturnValue({
      isBulkLoading: false,
      bulkLoadingProgress: 0,
    });

    const { getByText } = renderWithTamagui(<Settings />);
    expect(getByText('Bulk Add 5000 Tasks')).toBeTruthy();
    expect(getByText('Bulk Add 50 Tasks')).toBeTruthy();
    expect(getByText('Bulk Add 1 Tasks')).toBeTruthy();
  });
});
