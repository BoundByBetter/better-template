import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { PostItem } from './PostItem';
import { PostStatus } from '@boundbybetter/shared';
import { deletePost } from '@boundbybetter/state';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';
import { describe, it, expect } from '@jest/globals';

jest.mock('@boundbybetter/state', () => ({
  deletePost: jest.fn(),
}));

describe('PostItem', () => {
  it('should render the post title', async () => {
    const post = {
      id: '1',
      title: 'My Post',
      status: PostStatus.ACTIVE,
      content: 'This is my post',
    };
    const { getByText } = renderWithTamagui(<PostItem post={post} />);
    const title = getByText(post.title);
    expect(title).toBeTruthy();
  });

  it('should render a delete button', async () => {
    const post = {
      id: '1',
      title: 'My Post',
      status: PostStatus.ACTIVE,
      content: 'This is my post',
    };
    const { getByText } = renderWithTamagui(<PostItem post={post} />);
    const deleteButton = getByText('X');
    expect(deleteButton).toBeTruthy();
  });

  it('should call deletePost when delete button is pressed', async () => {
    const post = {
      id: '1',
      title: 'My Post',
      status: PostStatus.ACTIVE,
      content: 'This is my post',
    };
    const { getByText } = renderWithTamagui(<PostItem post={post} />);
    const deleteButton = getByText('X');
    fireEvent.press(deleteButton);
    expect(deletePost).toHaveBeenCalledWith(post.id);
  });
});