import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { PostItem } from './PostItem';
import { PostStatus } from '@boundbybetter/shared';
import { deletePost, usePost } from '@boundbybetter/state';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';
import { describe, it, expect } from '@jest/globals';

jest.mock('@boundbybetter/state', () => ({
  deletePost: jest.fn(),
  usePost: jest.fn(),
}));

describe('PostItem', () => {
  const mockPost = {
    id: '1',
    title: 'My Post',
    status: PostStatus.ACTIVE,
    content: 'This is my post',
    createdAt: '2023-05-01T00:00:00.000Z',
  };

  beforeEach(() => {
    (usePost as jest.Mock).mockReturnValue(mockPost);
  });

  it('should render the post title', async () => {
    const { getByText } = renderWithTamagui(<PostItem id={mockPost.id} />);
    const title = getByText(mockPost.title);
    expect(title).toBeTruthy();
  });

  it('should render a delete button', async () => {
    const { getByText } = renderWithTamagui(<PostItem id={mockPost.id} />);
    const deleteButton = getByText('X');
    expect(deleteButton).toBeTruthy();
  });

  it('should call deletePost when delete button is pressed', async () => {
    const { getByText } = renderWithTamagui(<PostItem id={mockPost.id} />);
    const deleteButton = getByText('X');
    fireEvent.press(deleteButton);
    expect(deletePost).toHaveBeenCalledWith(mockPost.id);
  });
});