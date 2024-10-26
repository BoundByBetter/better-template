import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { TaskItem } from './TaskItem';
import { TaskStatus } from '@boundbybetter/shared';
import { useTask } from '@boundbybetter/state';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';
import { describe, it, expect } from '@jest/globals';

jest.mock('@boundbybetter/state', () => ({
  deleteTask: jest.fn(),
  useTask: jest.fn(),
}));

describe('TaskItem', () => {
  const mockTask = {
    id: '1',
    title: 'My Task',
    status: TaskStatus.ACTIVE,
    content: 'This is my task',
    createdAt: '2023-05-01T00:00:00.000Z',
  };

  beforeEach(() => {
    (useTask as jest.Mock).mockReturnValue(mockTask);
  });

  it('should render the task title', async () => {
    const { getByText } = renderWithTamagui(
      <TaskItem
        id={mockTask.id}
        isSelected={false}
        onSelect={() => {}}
        onDelete={() => {}}
      />,
    );
    const title = getByText(mockTask.title);
    expect(title).toBeTruthy();
  });

  it('should render a delete button', async () => {
    const { getByText } = renderWithTamagui(
      <TaskItem
        id={mockTask.id}
        isSelected={false}
        onSelect={() => {}}
        onDelete={() => {}}
      />,
    );
    const deleteButton = getByText('X');
    expect(deleteButton).toBeTruthy();
  });

  it('should call deleteTask when delete button is pressed', async () => {
    const onDeleteMock = jest.fn();
    const { getByText } = renderWithTamagui(
      <TaskItem
        id={mockTask.id}
        isSelected={false}
        onSelect={() => {}}
        onDelete={onDeleteMock}
      />,
    );
    const deleteButton = getByText('X');
    fireEvent.press(deleteButton);
    expect(onDeleteMock).toHaveBeenCalled();
  });

  it('should apply selected background color when isSelected is true', async () => {
    const { getByTestId } = renderWithTamagui(
      <TaskItem
        id={mockTask.id}
        isSelected={true}
        onSelect={() => {}}
        onDelete={() => {}}
      />,
    );
    const taskItem = getByTestId('task-item');
    expect(taskItem.props.style).toHaveProperty('backgroundColor', {
      dynamic: { dark: '#232323', light: 'hsl(0, 0%, 94.1%)' },
    });
  });

  it('should not apply selected background color when isSelected is false', async () => {
    const { getByTestId } = renderWithTamagui(
      <TaskItem
        id={mockTask.id}
        isSelected={false}
        onSelect={() => {}}
        onDelete={() => {}}
      />,
    );
    const taskItem = getByTestId('task-item');
    expect(taskItem.props.style).not.toHaveProperty(
      'backgroundColor',
      '$color4',
    );
  });

  it('should not trigger onSelect when delete button is pressed', () => {
    const onSelectMock = jest.fn();
    const onDeleteMock = jest.fn();
    const { getByText } = renderWithTamagui(
      <TaskItem
        id={mockTask.id}
        isSelected={false}
        onSelect={onSelectMock}
        onDelete={onDeleteMock}
      />,
    );
    const deleteButton = getByText('X');
    fireEvent.press(deleteButton);
    expect(onDeleteMock).toHaveBeenCalledTimes(1);
    expect(onSelectMock).not.toHaveBeenCalled();
  });
  it('should return null if the task is not found', () => {
    (useTask as jest.Mock).mockReturnValue(null);
    const { getByText } = renderWithTamagui(
      <TaskItem
        id={mockTask.id}
        isSelected={false}
        onSelect={() => {}}
        onDelete={() => {}}
      />,
    );
    expect(getByText('Task not found')).toBeTruthy();
  });
});
