import React from 'react';
import { PostList } from './PostList';
import { useAppSelector } from '@boundbybetter/state';
import { PostItem } from '../PostItem';
import { AddPost } from '../AddPost';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';

//mock useAppSelector
jest.mock('@boundbybetter/state', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
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
    (useAppSelector as unknown as jest.Mock).mockReturnValue([
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
