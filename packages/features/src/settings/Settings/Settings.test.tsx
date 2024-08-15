import React from 'react';
import { act, fireEvent } from '@testing-library/react-native';
import { Settings } from './Settings';
import { useAppDispatch, useAppSelector } from '@boundbybetter/state';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';
import { userLoggedOut } from '@boundbybetter/shared';
//import { signOut } from '@boundbybetter/backend';

jest.mock('@boundbybetter/state');

describe('Settings', () => {
  it('should render the users name', async () => {
    // Mock the user being logged in
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      userName: 'myusername',
    });
    const { getByText } = renderWithTamagui(<Settings />);
    await act(async () => {
      expect(getByText('Hello there myusername,')).toBeTruthy();
    });
  });
  it('should dispatch a userLoggedOut action when the sign out button is pressed', async () => {
    const dispatch = jest.fn();
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
    const { getByText } = renderWithTamagui(<Settings />);
    const signOutButton = getByText('Sign Out');
    await act(async () => {
      fireEvent.press(signOutButton);
    });
    // expect the signOut function to be called
    //expect(signOut).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(userLoggedOut());
  });
});
