import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { AddTask } from './AddTask';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';
import { useActiveFeature } from '../../features/useActiveFeature';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { useAddTask, useTaskCount } from '@boundbybetter/state';

jest.mock('../../features/useActiveFeature', () => ({
  useActiveFeature: jest.fn(),
}));

jest.mock('@boundbybetter/state', () => ({
  useTaskCount: jest.fn(),
  useAddTask: jest.fn(),
}));

describe('AddTask', () => {
  beforeEach(() => {
    (useActiveFeature as jest.Mock).mockReturnValue(true);
    (useTaskCount as jest.Mock).mockReturnValue(0);
    (useAddTask as jest.Mock).mockImplementation((task) => {
      // Mock implementation for adding a task
      return jest.fn();
    });
  });

  it('should update the title when input value changes', () => {
    const { getByPlaceholderText } = renderWithTamagui(<AddTask />);
    const inputElement = getByPlaceholderText('New Task Name');

    fireEvent.changeText(inputElement, 'New Task Title');

    expect(inputElement.props.value).toBe('New Task Title');
  });

  it('should add a new task when Add button is pressed and clear the input', async () => {
    const addTaskMock = jest.fn();
    (useAddTask as jest.Mock).mockImplementation(() => addTaskMock);

    const { getByPlaceholderText, getByText } = renderWithTamagui(<AddTask />);
    const inputElement = getByPlaceholderText('New Task Name');
    const addButton = getByText('Add');

    fireEvent.changeText(inputElement, 'New Task Title');
    fireEvent.press(addButton);

    await waitFor(() => {
      expect(addTaskMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'New Task Title',
          rating: 5,
          status: 'ACTIVE',
        }),
      );
    });

    expect(inputElement.props.value).toBe('');
  });

  it('should prevent the user from adding more than 5 tasks if the user is not a member of the licensed group', async () => {
    (useActiveFeature as jest.Mock).mockReturnValue(false);

    // Mock the tasks to simulate existing tasks
    (useTaskCount as jest.Mock).mockReturnValue(5);

    const { getByText } = renderWithTamagui(<AddTask />);

    await waitFor(() => expect(getByText('Free Limit Reached')).toBeTruthy());
    await waitFor(() =>
      expect(
        getByText(
          'The free version is for evaluation purposes only and only allows up to 5 tasks. To add more tasks please purchase a license.',
        ),
      ).toBeTruthy(),
    );
    await waitFor(() => expect(getByText('Purchase')).toBeTruthy());
  });
});
