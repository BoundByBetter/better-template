import React from 'react';
import { TasksScreen } from './TasksScreen';
import { TaskList } from '../TaskList';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';
import { describe, it, expect } from '@jest/globals';

// Mock My Tasks
jest.mock('../TaskList', () => ({
  TaskList: jest.fn().mockImplementation(() => null),
}));

describe('TasksScreen', () => {
  it('should render TaskList', async () => {
    renderWithTamagui(<TasksScreen />);
    expect(TaskList as jest.Mock).toHaveBeenCalled();
  });
});
