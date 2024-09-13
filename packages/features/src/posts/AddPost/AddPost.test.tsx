import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { AddPost } from './AddPost';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';
import { useActiveFeature } from '../../features/useActiveFeature';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { store } from '@boundbybetter/state';

jest.mock('../../features/useActiveFeature', () => ({
  useActiveFeature: jest.fn(),
}));

describe('AddPost', () => {
  beforeEach(() => {
    store.delTables();
    (useActiveFeature as jest.Mock).mockReturnValue(true);
  });

  it('should update the title when input value changes', () => {
    const { getByPlaceholderText } = renderWithTamagui(<AddPost />);
    const inputElement = getByPlaceholderText('New Post Name');

    fireEvent.changeText(inputElement, 'New Post Title');

    expect(inputElement.props.value).toBe('New Post Title');
  });

  it('should add a new post when Add button is pressed', async () => {
    const { getByPlaceholderText, getByText } = renderWithTamagui(<AddPost />);
    const inputElement = getByPlaceholderText('New Post Name');
    const addButton = getByText('Add');

    fireEvent.changeText(inputElement, 'New Post Title');
    fireEvent.press(addButton);

    await waitFor(() => {
      const posts = store.getTable('posts');
      expect(Object.keys(posts).length).toBe(1);
      const newPost = Object.values(posts)[0] as any;
      expect(newPost.title).toBe('New Post Title');
      expect(newPost.status).toBe('ACTIVE');
      expect(newPost.rating).toBe(5);
    });
  });

  it('should prevent the user from adding more than 5 posts if the user is not a member of the licensed group', async () => {
    (useActiveFeature as jest.Mock).mockReturnValue(false);
    
    // Add 5 posts to the store
    for (let i = 0; i < 5; i++) {
      store.setRow('posts', `post${i}`, { id: `post${i}`, title: `Post ${i}`, status: 'ACTIVE' });
    }

    const { getByText } = renderWithTamagui(<AddPost />);

    await waitFor(() => expect(getByText('Free Limit Reached')).toBeTruthy());
    await waitFor(() =>
      expect(
        getByText(
          'The free version is for evaluation purposes only and only allows up to 5 posts. To add more posts please purchase a license.',
        ),
      ).toBeTruthy(),
    );
    await waitFor(() => expect(getByText('Purchase')).toBeTruthy());
  });
});
