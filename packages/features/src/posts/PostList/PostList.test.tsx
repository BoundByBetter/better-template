import React from 'react';
import { PostList } from './PostList';
import { usePosts } from '@boundbybetter/state';
import { AddPost } from '../AddPost';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';
import { describe, it, expect } from '@jest/globals';
import { PostItem } from '../PostItem';
import { act, waitFor } from '@testing-library/react-native';

//mock usePosts
jest.mock('@boundbybetter/state', () => ({
  usePosts: jest.fn(),
}));

//spy on PostItem
jest.mock('../PostItem', () => ({
  PostItem: jest.fn(() => null),
}));

//mock AddPost
jest.mock('../AddPost', () => ({
  AddPost: jest.fn(() => null),
}));

describe('PostList', () => {
  it('should render a PostItem for each post', async () => {
    const mockPosts = [
      {
        id: '1',
        title: 'My Post',
        status: 'ACTIVE',
        content: 'This is my post',
        createdAt: '2023-05-01T00:00:00.000Z',
      },
      {
        id: '2',
        title: 'My Second Post',
        status: 'ACTIVE',
        content: 'This is my second post',
        createdAt: '2023-05-02T00:00:00.000Z',
      },
    ];
    (usePosts as jest.Mock).mockReturnValue(mockPosts);

    renderWithTamagui(<PostList />);

    expect(PostItem).toHaveBeenCalledWith({ id: '1' }, {});
    expect(PostItem).toHaveBeenCalledWith({ id: '2' }, {});
  });

  it('should render an AddPost component', () => {
    renderWithTamagui(<PostList />);
    expect(AddPost).toHaveBeenCalledWith({}, {});
  });

  it('should display the correct total post count', () => {
    const mockPosts = [
      { id: '1', title: 'Post 1', createdAt: '2023-05-01T00:00:00.000Z' },
      { id: '2', title: 'Post 2', createdAt: '2023-05-02T00:00:00.000Z' },
    ];
    (usePosts as jest.Mock).mockReturnValue(mockPosts);

    const { getByText } = renderWithTamagui(<PostList />);
    expect(getByText('Total Posts: 2')).toBeTruthy();
  });
});
