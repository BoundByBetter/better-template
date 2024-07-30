import React from 'react';
import { act, fireEvent } from '@testing-library/react-native';
import { PostItem } from './PostItem';
import { PostStatus } from '@boundbybetter/shared';
import { useAppDispatch } from '@boundbybetter/state';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';

describe('PostItem', () => {
  it('should render the post title', async () => {
    const dispatch = jest.fn();
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
    const post = {
      id: '1',
      title: 'My Post',
      status: PostStatus.ACTIVE,
      content: 'This is my post',
    };
    const { getByText } = renderWithTamagui(<PostItem post={post} />);
    await act(async () => {
      const title = getByText(post.title);
      expect(title).toBeTruthy();
    });
  });
  it('should render a delete button', async () => {
    const dispatch = jest.fn();
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
    const post = {
      id: '1',
      title: 'My Post',
      status: PostStatus.ACTIVE,
      content: 'This is my post',
    };
    const { getByText } = renderWithTamagui(<PostItem post={post} />);
    await act(async () => {
      const deleteButton = getByText('X');
      expect(deleteButton).toBeTruthy();
    });
  });
  it('should dispatch a postDeleted action when delete button is pressed', async() => {
    const dispatch = jest.fn();
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
    const post = {
      id: '1',
      title: 'My Post',
      status: PostStatus.ACTIVE,
      content: 'This is my post',
    };
    const { getByText } = renderWithTamagui(<PostItem post={post} />);
    const deleteButton = getByText('X');
    await act(async () => {
      fireEvent.press(deleteButton);
      expect(dispatch).toHaveBeenCalledWith({ type: 'posts/postDeleted', payload: post });
    });
  });
});