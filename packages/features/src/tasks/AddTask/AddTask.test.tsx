import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { AddTask } from './AddTask';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';
import { useActiveFeature } from '../../features/useActiveFeature';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { store } from '@boundbybetter/state';

jest.mock('../../features/useActiveFeature', () => ({
  useActiveFeature: jest.fn(),
}));

describe('AddTask', () => {
  beforeEach(() => {
    store.delTables();
    (useActiveFeature as jest.Mock).mockReturnValue(true);
  });

  it('should update the title when input value changes', () => {
    const { getByPlaceholderText } = renderWithTamagui(<AddTask />);
    const inputElement = getByPlaceholderText('New Task Name');

    fireEvent.changeText(inputElement, 'New Task Title');

    expect(inputElement.props.value).toBe('New Task Title');
  });

  it('should add a new task when Add button is pressed', async () => {
    const { getByPlaceholderText, getByText } = renderWithTamagui(<AddTask />);
    const inputElement = getByPlaceholderText('New Task Name');
    const addButton = getByText('Add');

    fireEvent.changeText(inputElement, 'New Task Title');
    fireEvent.press(addButton);

    await waitFor(() => {
      const tasks = store.getTable('tasks');
      expect(Object.keys(tasks).length).toBe(1);
      const newTask = Object.values(tasks)[0] as any;
      expect(newTask.title).toBe('New Task Title');
      expect(newTask.status).toBe('ACTIVE');
      expect(newTask.rating).toBe(5);
    });
  });

  it('should prevent the user from adding more than 5 tasks if the user is not a member of the licensed group', async () => {
    (useActiveFeature as jest.Mock).mockReturnValue(false);
    
    // Add 5 tasks to the store
    for (let i = 0; i < 5; i++) {
      store.setRow('tasks', `task${i}`, { id: `task${i}`, title: `Task ${i}`, status: 'ACTIVE' });
    }

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
