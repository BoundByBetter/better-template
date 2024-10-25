import React from 'react';
import { TaskList } from './TaskList';
import {
  useTaskIds,
  useBulkLoadStatus,
  useDeleteTask,
} from '@boundbybetter/state';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { TaskItem } from '../TaskItem';
import { fireEvent } from '@testing-library/react-native';

// Mock useTasks and other hooks
jest.mock('@boundbybetter/state', () => ({
  useTaskIds: jest.fn(),
  useBulkLoadStatus: jest.fn(),
  useDeleteTask: jest.fn(),
}));

// Spy on TaskItem
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

// Mock AddTask without jest.fn()
jest.mock('../AddTask', () => {
  const React = require('react');
  const { View } = require('react-native');
  const AddTask = React.forwardRef((props, ref) => (
    <View testID="add-task" ref={ref} {...props} />
  ));
  AddTask.displayName = 'AddTask';
  return {
    AddTask,
  };
});

describe('TaskList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render a TaskItem for each task', () => {
    (useTaskIds as jest.Mock).mockReturnValue(['1', '2']);
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
    (useTaskIds as jest.Mock).mockReturnValue([]);
    (useBulkLoadStatus as jest.Mock).mockReturnValue({
      isBulkLoading: false,
      bulkLoadingProgress: 0,
    });
    const { getByTestId } = renderWithTamagui(
      <TaskList onSelectTask={jest.fn()} />,
    );
    expect(getByTestId('add-task')).toBeTruthy();
  });

  it('should display the correct total task count', () => {
    (useTaskIds as jest.Mock).mockReturnValue(['1', '2']);
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
    (useTaskIds as jest.Mock).mockReturnValue([]);
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
    (useTaskIds as jest.Mock).mockReturnValue([]);
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
    (useTaskIds as jest.Mock).mockReturnValue([]);
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
    (useTaskIds as jest.Mock).mockReturnValue(['1', '2']);
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
    (useTaskIds as jest.Mock).mockReturnValue(['1', '2']);
    (useBulkLoadStatus as jest.Mock).mockReturnValue({
      isBulkLoading: false,
      bulkLoadingProgress: 0,
    });
    const deleteTaskMock = jest.fn();
    (useDeleteTask as jest.Mock).mockImplementation(() => deleteTaskMock);

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
    expect(deleteTaskMock).toHaveBeenCalledWith('1');

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
    (useTaskIds as jest.Mock).mockReturnValue(['1', '2']);
    (useBulkLoadStatus as jest.Mock).mockReturnValue({
      isBulkLoading: false,
      bulkLoadingProgress: 0,
    });

    const deleteTaskMock = jest.fn();
    (useDeleteTask as jest.Mock).mockImplementation(() => deleteTaskMock);

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
    expect(deleteTaskMock).toHaveBeenCalledWith('1');

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
