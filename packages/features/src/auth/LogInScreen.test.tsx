import { fireEvent, screen } from '@testing-library/react-native';
import { LogInScreen } from './LogInScreen';
import { User } from '@boundbybetter/shared';
import { updateCurrentUser } from '@boundbybetter/state';
import { renderWithTamagui } from '../renderWithTamagui.test-util';
import { describe, expect, it } from '@jest/globals';
import '@testing-library/jest-native/extend-expect';

jest.mock('@boundbybetter/state', () => ({
  updateCurrentUser: jest.fn(),
}));

describe('LogInScreen', () => {
  it('should render the login options', () => {
    const { getByText, getByTestId } = renderWithTamagui(<LogInScreen />);

    expect(getByTestId('app-log-in')).toBeTruthy();
    expect(getByText('My App')).toBeTruthy();
    expect(getByText('Log In')).toBeTruthy();
    expect(getByText('Please select a method for logging in.')).toBeTruthy();
    expect(getByText('Microsoft')).toBeTruthy();
    expect(getByText('Google')).toBeTruthy();
    expect(getByText('Facebook')).toBeTruthy();
  });

  it('should call updateCurrentUser when Microsoft button is clicked', () => {
    renderWithTamagui(<LogInScreen />);
    const microsoftButton = screen.getByText('Microsoft');
    fireEvent.press(microsoftButton);

    const expectedUser: User = {
      userName: 'Test User',
      userEmail: 'testuser@boundbybetter.com',
      groups: [],
    };

    expect(updateCurrentUser).toHaveBeenCalledWith(expectedUser);
  });

  it('should call updateCurrentUser when Google button is clicked', () => {
    renderWithTamagui(<LogInScreen />);
    const googleButton = screen.getByText('Google');
    fireEvent.press(googleButton);

    const expectedUser: User = {
      userName: 'Test User',
      userEmail: 'testuser@boundbybetter.com',
      groups: [],
    };

    expect(updateCurrentUser).toHaveBeenCalledWith(expectedUser);
  });

  it('should call updateCurrentUser when Facebook button is clicked', () => {
    renderWithTamagui(<LogInScreen />);
    const facebookButton = screen.getByText('Facebook');
    fireEvent.press(facebookButton);

    const expectedUser: User = {
      userName: 'Test User',
      userEmail: 'testuser@boundbybetter.com',
      groups: [],
    };

    expect(updateCurrentUser).toHaveBeenCalledWith(expectedUser);
  });
});
