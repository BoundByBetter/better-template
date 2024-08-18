// For more details about the project structure and key components, refer to <projectRoog>/docs/PROJECT_DETAILS.md
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { LogInScreen } from './LogInScreen';
import { userLoggedIn } from '@boundbybetter/shared';
import { useAppDispatch } from '@boundbybetter/state';
import { describe, it, expect } from '@jest/globals';
import { renderWithTamagui } from '../renderWithTamagui.test-util';

jest.mock('@boundbybetter/state', () => ({
  useAppDispatch: jest.fn(),
}));

describe('LogInScreen', () => {
  beforeEach(() => {
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());
  });

  it('should render the component', () => {
    const { getByTestId } = renderWithTamagui(<LogInScreen />);
    const logInScreen = getByTestId('app-log-in');
    expect(logInScreen).toBeTruthy();
  });

  it('should dispatch userLoggedIn action when Microsoft button is clicked', () => {
    const dispatch = jest.fn();
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(dispatch);

    const { getByText } = renderWithTamagui(<LogInScreen />);
    const microsoftButton = getByText('Microsoft');
    fireEvent.press(microsoftButton);

    expect(dispatch).toHaveBeenCalledWith(
      userLoggedIn({
        userName: 'Test User',
        userEmail: 'testuser@boundbybetter.com',
        groups: [],
      }),
    );
  });

  it('should dispatch userLoggedIn action when Google button is clicked', () => {
    const dispatch = jest.fn();
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(dispatch);

    const { getByText } = renderWithTamagui(<LogInScreen />);
    const googleButton = getByText('Google');
    fireEvent.press(googleButton);

    expect(dispatch).toHaveBeenCalledWith(
      userLoggedIn({
        userName: 'Test User',
        userEmail: 'testuser@boundbybetter.com',
        groups: [],
      }),
    );
  });

  it('should dispatch userLoggedIn action when Facebook button is clicked', () => {
    const dispatch = jest.fn();
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(dispatch);

    const { getByText } = renderWithTamagui(<LogInScreen />);
    const facebookButton = getByText('Facebook');
    fireEvent.press(facebookButton);

    expect(dispatch).toHaveBeenCalledWith(
      userLoggedIn({
        userName: 'Test User',
        userEmail: 'testuser@boundbybetter.com',
        groups: [],
      }),
    );
  });
});
