import React from 'react';
import { TaskList } from './TaskList';
import { useTasks, useBulkLoadStatus } from '@boundbybetter/state';
import { AddTask } from '../AddTask';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { TaskItem } from '../TaskItem';

//mock useTasks
jest.mock('@boundbybetter/state', () => ({
  useTasks: jest.fn(),
  useBulkLoadStatus: jest.fn(),
}));

//spy on TaskItem
jest.mock('../TaskItem', () => ({
  TaskItem: jest.fn(() => null),
}));

//mock AddTask
jest.mock('../AddTask', () => ({
  AddTask: jest.fn(() => null),
}));

describe('TaskList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render a TaskItem for each task', () => {
    const mockTasks = [
      {
        id: '1',
        title: 'My Task',
        status: 'ACTIVE',
        content: 'This is my task',
        createdAt: '2023-05-01T00:00:00.000Z',
      },
      {
        id: '2',
        title: 'My Second Task',
        status: 'ACTIVE',
        content: 'This is my second task',
        createdAt: '2023-05-02T00:00:00.000Z',
      },
    ];
    (useTasks as jest.Mock).mockReturnValue(mockTasks);
    (useBulkLoadStatus as jest.Mock).mockReturnValue({
      isBulkLoading: false,
      bulkLoadingProgress: 0,
    });

    renderWithTamagui(<TaskList />);

    expect(TaskItem).toHaveBeenCalledTimes(2);
    expect(TaskItem).toHaveBeenCalledWith({ id: '1', isSelected: false }, {});
    expect(TaskItem).toHaveBeenCalledWith({ id: '2', isSelected: false }, {});
  });

  it('should render an AddTask component', () => {
    (useTasks as jest.Mock).mockReturnValue([]);
    (useBulkLoadStatus as jest.Mock).mockReturnValue({
      isBulkLoading: false,
      bulkLoadingProgress: 0,
    });
    renderWithTamagui(<TaskList />);
    expect(AddTask).toHaveBeenCalledTimes(1);
  });

  it('should display the correct total task count', () => {
    const mockTasks = [
      { id: '1', title: 'Task 1', createdAt: '2023-05-01T00:00:00.000Z' },
      { id: '2', title: 'Task 2', createdAt: '2023-05-02T00:00:00.000Z' },
    ];
    (useTasks as jest.Mock).mockReturnValue(mockTasks);
    (useBulkLoadStatus as jest.Mock).mockReturnValue({
      isBulkLoading: false,
      bulkLoadingProgress: 0,
    });

    const { getByText } = renderWithTamagui(<TaskList />);
    expect(getByText('Total Tasks: 2')).toBeTruthy();
  });

  it('should display loading state when bulk loading', () => {
    (useTasks as jest.Mock).mockReturnValue([]);
    (useBulkLoadStatus as jest.Mock).mockReturnValue({
      isBulkLoading: true,
      bulkLoadingProgress: 50,
    });

    const { getByText } = renderWithTamagui(<TaskList />);
    expect(getByText('Loading tasks... 50%')).toBeTruthy();
  });

  it('should display a message when there are no tasks', () => {
    (useTasks as jest.Mock).mockReturnValue([]);
    (useBulkLoadStatus as jest.Mock).mockReturnValue({
      isBulkLoading: false,
      bulkLoadingProgress: 0,
    });

    const { getByText } = renderWithTamagui(<TaskList />);
    expect(getByText('Total Tasks: 0')).toBeTruthy();
  });

  it('should handle undefined tasks', () => {
    (useTasks as jest.Mock).mockReturnValue(undefined);
    (useBulkLoadStatus as jest.Mock).mockReturnValue({
      isBulkLoading: false,
      bulkLoadingProgress: 0,
    });

    const { getByText } = renderWithTamagui(<TaskList />);
    expect(getByText('Total Tasks: 0')).toBeTruthy();
  });

  it('should handle empty tasks array', () => {
    (useTasks as jest.Mock).mockReturnValue([]);
    (useBulkLoadStatus as jest.Mock).mockReturnValue({
      isBulkLoading: false,
      bulkLoadingProgress: 0,
    });

    const { getByText } = renderWithTamagui(<TaskList />);
    expect(getByText('Total Tasks: 0')).toBeTruthy();
  });
});
