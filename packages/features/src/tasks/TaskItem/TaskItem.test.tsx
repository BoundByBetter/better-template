import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { TaskItem } from './TaskItem';
import { TaskStatus } from '@boundbybetter/shared';
import { deleteTask, useTask } from '@boundbybetter/state';
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
    const { getByText } = renderWithTamagui(<TaskItem id={mockTask.id} />);
    const title = getByText(mockTask.title);
    expect(title).toBeTruthy();
  });

  it('should render a delete button', async () => {
    const { getByText } = renderWithTamagui(<TaskItem id={mockTask.id} />);
    const deleteButton = getByText('X');
    expect(deleteButton).toBeTruthy();
  });

  it('should call deleteTask when delete button is pressed', async () => {
    const { getByText } = renderWithTamagui(<TaskItem id={mockTask.id} />);
    const deleteButton = getByText('X');
    fireEvent.press(deleteButton);
    expect(deleteTask).toHaveBeenCalledWith(mockTask.id);
  });
});