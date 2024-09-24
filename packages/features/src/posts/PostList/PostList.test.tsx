import React from 'react';
import { PostList } from './PostList';
import { usePosts, useBulkLoadStatus } from '@boundbybetter/state';
import { AddPost } from '../AddPost';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { PostItem } from '../PostItem';

//mock usePosts
jest.mock('@boundbybetter/state', () => ({
  usePosts: jest.fn(),
  useBulkLoadStatus: jest.fn(),
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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render a PostItem for each post', () => {
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
    (useBulkLoadStatus as jest.Mock).mockReturnValue({
      isBulkLoading: false,
      bulkLoadingProgress: 0,
    });

    renderWithTamagui(<PostList />);

    expect(PostItem).toHaveBeenCalledTimes(2);
    expect(PostItem).toHaveBeenCalledWith({ id: '1' }, {});
    expect(PostItem).toHaveBeenCalledWith({ id: '2' }, {});
  });

  it('should render an AddPost component', () => {
    (usePosts as jest.Mock).mockReturnValue([]);
    (useBulkLoadStatus as jest.Mock).mockReturnValue({
      isBulkLoading: false,
      bulkLoadingProgress: 0,
    });
    renderWithTamagui(<PostList />);
    expect(AddPost).toHaveBeenCalledTimes(1);
  });

  it('should display the correct total post count', () => {
    const mockPosts = [
      { id: '1', title: 'Post 1', createdAt: '2023-05-01T00:00:00.000Z' },
      { id: '2', title: 'Post 2', createdAt: '2023-05-02T00:00:00.000Z' },
    ];
    (usePosts as jest.Mock).mockReturnValue(mockPosts);
    (useBulkLoadStatus as jest.Mock).mockReturnValue({
      isBulkLoading: false,
      bulkLoadingProgress: 0,
    });

    const { getByText } = renderWithTamagui(<PostList />);
    expect(getByText('Total Posts: 2')).toBeTruthy();
  });

  it('should display loading state when bulk loading', () => {
    (usePosts as jest.Mock).mockReturnValue([]);
    (useBulkLoadStatus as jest.Mock).mockReturnValue({
      isBulkLoading: true,
      bulkLoadingProgress: 50,
    });

    const { getByText } = renderWithTamagui(<PostList />);
    expect(getByText('Loading posts... 50%')).toBeTruthy();
  });

  it('should display a message when there are no posts', () => {
    (usePosts as jest.Mock).mockReturnValue([]);
    (useBulkLoadStatus as jest.Mock).mockReturnValue({
      isBulkLoading: false,
      bulkLoadingProgress: 0,
    });

    const { getByText } = renderWithTamagui(<PostList />);
    expect(getByText('Total Posts: 0')).toBeTruthy();
  });

  it('should handle undefined posts', () => {
    (usePosts as jest.Mock).mockReturnValue(undefined);
    (useBulkLoadStatus as jest.Mock).mockReturnValue({
      isBulkLoading: false,
      bulkLoadingProgress: 0,
    });

    const { getByText } = renderWithTamagui(<PostList />);
    expect(getByText('Total Posts: 0')).toBeTruthy();
  });

  it('should handle empty posts array', () => {
    (usePosts as jest.Mock).mockReturnValue([]);
    (useBulkLoadStatus as jest.Mock).mockReturnValue({
      isBulkLoading: false,
      bulkLoadingProgress: 0,
    });

    const { getByText } = renderWithTamagui(<PostList />);
    expect(getByText('Total Posts: 0')).toBeTruthy();
  });
});
