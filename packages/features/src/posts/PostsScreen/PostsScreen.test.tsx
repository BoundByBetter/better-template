import React from 'react';
import { PostsScreen } from './PostsScreen';
import { PostList } from '../PostList';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';

// Mock My Posts
jest.mock('../PostList', () => ({
  PostList: jest.fn().mockImplementation(() => null),
}));

describe('PostsScreen', () => {
  it('should render PostList', async () => {
    renderWithTamagui(<PostsScreen />);
    expect(PostList as jest.Mock).toHaveBeenCalled();
  });
});