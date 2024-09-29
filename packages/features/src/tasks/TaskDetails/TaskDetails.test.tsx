import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { TaskDetails } from './TaskDetails';
import { useTask } from '@boundbybetter/state';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';
import { describe, it, expect } from '@jest/globals';
import moment from 'moment';

jest.mock('@boundbybetter/state', () => ({
  useTask: jest.fn(),
}));

describe('TaskDetails', () => {
  const mockTask = {
    id: '1',
    title: 'Test Task',
    status: 'ACTIVE',
    rating: 5,
    content: 'This is a test task',
    createdAt: '2023-05-01T12:00:00.000Z',
    updatedAt: '2023-05-02T14:30:00.000Z',
  };

  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useTask as jest.Mock).mockReturnValue(mockTask);
  });

  it('renders task details correctly', () => {
    const { getByText } = renderWithTamagui(
      <TaskDetails taskId="1" onClose={mockOnClose} />,
    );

    expect(getByText('Test Task')).toBeTruthy();
    expect(getByText('Status: ACTIVE')).toBeTruthy();
    expect(getByText('Rating: 5')).toBeTruthy();
    expect(getByText('Content: This is a test task')).toBeTruthy();
    expect(
      getByText(
        `Created: ${moment(mockTask.createdAt).format('MMMM D, YYYY h:mm A')}`,
      ),
    ).toBeTruthy();
    expect(
      getByText(
        `Updated: ${moment(mockTask.updatedAt).format('MMMM D, YYYY h:mm A')}`,
      ),
    ).toBeTruthy();
  });

  it('calls onClose when close button is pressed', () => {
    const { getByText } = renderWithTamagui(
      <TaskDetails taskId="1" onClose={mockOnClose} />,
    );

    fireEvent.press(getByText('Close'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('renders nothing when task is not found', () => {
    (useTask as jest.Mock).mockReturnValue(null);
    const { queryByText } = renderWithTamagui(
      <TaskDetails taskId="1" onClose={mockOnClose} />,
    );

    expect(queryByText('Test Task')).toBeNull();
  });

  it('handles null taskId', () => {
    (useTask as jest.Mock).mockReturnValue(null);

    const { queryByText } = renderWithTamagui(
      <TaskDetails taskId={null} onClose={mockOnClose} />,
    );

    expect(queryByText('Test Task')).toBeNull();
  });

  it('renders task without content', () => {
    const taskWithoutContent = { ...mockTask, content: undefined };
    (useTask as jest.Mock).mockReturnValue(taskWithoutContent);

    const { getByText } = renderWithTamagui(
      <TaskDetails taskId="1" onClose={mockOnClose} />,
    );

    expect(getByText('Content: No content')).toBeTruthy();
  });
});
