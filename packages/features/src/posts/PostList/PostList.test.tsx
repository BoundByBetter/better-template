import React from 'react';
import { PostList } from './PostList';
import { usePosts } from '@boundbybetter/state';
import { PostItem } from '../PostItem';
import { AddPost } from '../AddPost';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';
import { describe, it, expect } from '@jest/globals';

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

describe('PostItems', () => {
  it('should render a PostItem for each post', () => {
    (usePosts as jest.Mock).mockReturnValue([
      {
        id: '1',
        title: 'My Post',
        status: 'ACTIVE',
        content: 'This is my post',
      },
      {
        id: '2',
        title: 'My Second Post',
        status: 'ACTIVE',
        content: 'This is my second post',
      },
    ]);
    renderWithTamagui(<PostList />);
    expect(PostItem).toHaveBeenCalledWith(
      {
        post: {
          id: '1',
          title: 'My Post',
          status: 'ACTIVE',
          content: 'This is my post',
        },
      },
      {},
    );
    expect(PostItem).toHaveBeenCalledWith(
      {
        post: {
          id: '2',
          title: 'My Second Post',
          status: 'ACTIVE',
          content: 'This is my second post',
        },
      },
      {},
    );
  });
  it('should render an AddPost', () => {
    renderWithTamagui(<PostList />);
    expect(AddPost).toHaveBeenCalledWith({}, {});
  });
});
