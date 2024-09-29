import React from 'react';
import { TaskList } from './TaskList';
import { useTasks, useBulkLoadStatus, deleteTask } from '@boundbybetter/state';
import { AddTask } from '../AddTask';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { TaskItem } from '../TaskItem';
import { fireEvent } from '@testing-library/react-native';

//mock useTasks
jest.mock('@boundbybetter/state', () => ({
  useTasks: jest.fn(),
  useBulkLoadStatus: jest.fn(),
  deleteTask: jest.fn(),
}));

//spy on TaskItem
jest.mock('../TaskItem', () => {
  const { View } = require('react-native');
  return {
    TaskItem: jest.fn((props) => (
      <View testID="task-item" onPress={props.onSelect}>
        <View testID="task-item-delete" onPress={props.onDelete} />
      </View>
    )),
  };
});

//mock AddTask
jest.mock('../AddTask', () => {
  const { View } = require('react-native');
  return {
    AddTask: jest.fn(() => <View testID="add-task" />),
  };
});

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

    renderWithTamagui(<TaskList onSelectTask={jest.fn()} />);

    expect(TaskItem).toHaveBeenCalledTimes(2);
    expect(TaskItem).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        id: '1',
        isSelected: false,
        onSelect: expect.any(Function),
      }),
      {},
    );
    expect(TaskItem).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        id: '2',
        isSelected: false,
        onSelect: expect.any(Function),
      }),
      {},
    );
  });

  it('should render an AddTask component', () => {
    (useTasks as jest.Mock).mockReturnValue([]);
    (useBulkLoadStatus as jest.Mock).mockReturnValue({
      isBulkLoading: false,
      bulkLoadingProgress: 0,
    });
    renderWithTamagui(<TaskList onSelectTask={jest.fn()} />);
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

    const { getByText } = renderWithTamagui(
      <TaskList onSelectTask={jest.fn()} />,
    );
    expect(getByText('Total Tasks: 2')).toBeTruthy();
  });

  it('should display loading state when bulk loading', () => {
    (useTasks as jest.Mock).mockReturnValue([]);
    (useBulkLoadStatus as jest.Mock).mockReturnValue({
      isBulkLoading: true,
      bulkLoadingProgress: 50,
    });

    const { getByText } = renderWithTamagui(
      <TaskList onSelectTask={jest.fn()} />,
    );
    expect(getByText('Loading tasks... 50%')).toBeTruthy();
  });

  it('should display a message when there are no tasks', () => {
    (useTasks as jest.Mock).mockReturnValue([]);
    (useBulkLoadStatus as jest.Mock).mockReturnValue({
      isBulkLoading: false,
      bulkLoadingProgress: 0,
    });

    const { getByText } = renderWithTamagui(
      <TaskList onSelectTask={jest.fn()} />,
    );
    expect(getByText('Total Tasks: 0')).toBeTruthy();
  });

  it('should handle undefined tasks', () => {
    (useTasks as jest.Mock).mockReturnValue(undefined);
    (useBulkLoadStatus as jest.Mock).mockReturnValue({
      isBulkLoading: false,
      bulkLoadingProgress: 0,
    });

    const { getByText } = renderWithTamagui(
      <TaskList onSelectTask={jest.fn()} />,
    );
    expect(getByText('Total Tasks: 0')).toBeTruthy();
  });

  it('should handle empty tasks array', () => {
    (useTasks as jest.Mock).mockReturnValue([]);
    (useBulkLoadStatus as jest.Mock).mockReturnValue({
      isBulkLoading: false,
      bulkLoadingProgress: 0,
    });

    const { getByText } = renderWithTamagui(
      <TaskList onSelectTask={jest.fn()} />,
    );
    expect(getByText('Total Tasks: 0')).toBeTruthy();
  });

  it('should call onSelectTask and update selectedTaskIndex when a task is selected', () => {
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

    const mockOnSelectTask = jest.fn();
    const { getAllByTestId } = renderWithTamagui(
      <TaskList onSelectTask={mockOnSelectTask} />,
    );

    const taskItems = getAllByTestId('task-item');
    expect(taskItems).toHaveLength(2);

    (TaskItem as unknown as jest.Mock).mockClear();
    // Simulate selecting the first task
    fireEvent.press(taskItems[0]);

    // Check if onSelectTask was called with the correct task id
    expect(mockOnSelectTask).toHaveBeenCalledWith('1');

    expect(TaskItem).toHaveBeenCalledTimes(2);
    expect(TaskItem).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        id: '1',
        isSelected: true,
        onSelect: expect.any(Function),
      }),
      {},
    );
  });

  it('should handle task deletion correctly', () => {
    const mockTasks = [
      { id: '1', title: 'Task 1', createdAt: '2023-05-01T00:00:00.000Z' },
      { id: '2', title: 'Task 2', createdAt: '2023-05-02T00:00:00.000Z' },
    ];
    (useTasks as jest.Mock).mockReturnValue(mockTasks);
    (useBulkLoadStatus as jest.Mock).mockReturnValue({
      isBulkLoading: false,
      bulkLoadingProgress: 0,
    });

    const mockOnSelectTask = jest.fn();
    const { getAllByTestId } = renderWithTamagui(
      <TaskList onSelectTask={mockOnSelectTask} />,
    );

    // Select the first task
    const taskItems = getAllByTestId('task-item');
    fireEvent.press(taskItems[0]);

    // Clear previous calls to TaskItem
    (TaskItem as unknown as jest.Mock).mockClear();

    // Trigger delete on the first task
    const deleteButtons = getAllByTestId('task-item-delete');
    fireEvent.press(deleteButtons[0]);

    // Check if deleteTask was called with the correct task id
    expect(deleteTask).toHaveBeenCalledWith('1');

    // Check if TaskItem is rendered with updated props
    expect(TaskItem).toHaveBeenCalledTimes(2);
    expect(TaskItem).toHaveBeenCalledWith(
      expect.objectContaining({
        id: '2',
        isSelected: false,
      }),
      {},
    );
  });

  it('should deselect task when deleting the selected task', () => {
    const mockTasks = [
      { id: '1', title: 'Task 1', createdAt: '2023-05-01T00:00:00.000Z' },
      { id: '2', title: 'Task 2', createdAt: '2023-05-02T00:00:00.000Z' },
    ];
    (useTasks as jest.Mock).mockReturnValue(mockTasks);
    (useBulkLoadStatus as jest.Mock).mockReturnValue({
      isBulkLoading: false,
      bulkLoadingProgress: 0,
    });

    const mockOnSelectTask = jest.fn();
    const { getAllByTestId } = renderWithTamagui(
      <TaskList onSelectTask={mockOnSelectTask} />,
    );

    // Select the first task
    const taskItems = getAllByTestId('task-item');
    fireEvent.press(taskItems[0]);

    // Clear previous calls to TaskItem
    (TaskItem as unknown as jest.Mock).mockClear();

    // Trigger delete on the first (selected) task
    const deleteButtons = getAllByTestId('task-item-delete');
    fireEvent.press(deleteButtons[0]);

    // Check if deleteTask was called with the correct task id
    expect(deleteTask).toHaveBeenCalledWith('1');

    // Check if TaskItem is rendered with updated props
    expect(TaskItem).toHaveBeenCalledTimes(2);
    expect(TaskItem).toHaveBeenCalledWith(
      expect.objectContaining({
        id: '2',
        isSelected: false,
      }),
      {},
    );
  });
});
