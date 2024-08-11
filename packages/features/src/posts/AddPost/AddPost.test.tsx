import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { AddPost } from './AddPost';
import { useAppDispatch, useAppSelector } from '@boundbybetter/state';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';
import { useActiveFeature } from '../../features/useActiveFeature';

jest.mock('@boundbybetter/state');

jest.mock('../../features/useActiveFeature', () => ({
  useActiveFeature: jest.fn(),
}));

describe('AddPost', () => {
  it('should update the title when input value changes', () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue(0);
    (useActiveFeature as unknown as jest.Mock).mockReturnValue(true);
    const { getByPlaceholderText } = renderWithTamagui(<AddPost />);
    const inputElement = getByPlaceholderText('New Post Name');

    fireEvent.changeText(inputElement, 'New Post Title');

    expect(inputElement.props.value).toBe('New Post Title');
  });
  it('should dispatch postAdded action when Add button is pressed', async () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue(0);
    (useActiveFeature as unknown as jest.Mock).mockReturnValue(true);
    const dispatch = jest.fn();
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
    const { getByPlaceholderText, getByText } = renderWithTamagui(<AddPost />);
    const inputElement = getByPlaceholderText('New Post Name');
    const addButton = getByText('Add');

    fireEvent.changeText(inputElement, 'New Post Title');
    fireEvent.press(addButton);

    await waitFor(() => expect(dispatch).toHaveBeenCalledWith({
      type: 'posts/postAdded',
      payload: {
        createdAt: expect.any(String),
        id: expect.any(String),
        title: 'New Post Title',
        rating: 5,
        status: 'ACTIVE',
      },
    }));
  });
  it('should prevent the user from adding more than 5 posts if the user is not a member of the licensed group', async () => {
    const dispatch = jest.fn();
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
    (useAppSelector as unknown as jest.Mock).mockReturnValue(5);
    (useActiveFeature as unknown as jest.Mock).mockReturnValue(false);
    const { getByText } = renderWithTamagui(<AddPost />);

    await waitFor(() => expect(getByText('Free Limit Reached')).toBeTruthy());
    await waitFor(() => expect(getByText('The free version is for evaluation purposes only and only allows up to 5 posts.  To add more posts please purchase a license.')).toBeTruthy());
    await waitFor(() => expect(getByText('Purchase')).toBeTruthy());
  });
});