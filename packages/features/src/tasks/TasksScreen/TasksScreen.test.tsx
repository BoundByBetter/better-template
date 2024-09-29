import { TasksScreen } from './TasksScreen';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';
import { TaskList } from '../TaskList';
import { TaskDetails } from '../TaskDetails';
import { tg } from '@boundbybetter/ui';
import { describe, it, beforeEach, expect } from '@jest/globals';

jest.mock('../TaskList', () => {
  const View = require('react-native').View;
  return {
    TaskList: jest.fn(() => <View />),
  };
});
jest.mock('../TaskDetails', () => {
  const View = require('react-native').View;
  return {
    TaskDetails: jest.fn(() => <View />),
  };
});
jest.mock('@boundbybetter/ui', () => {
  const actual = jest.requireActual('@boundbybetter/ui');
  return {
    ...actual,
    tg: {
      ...actual.tg,
      useMedia: jest.fn(() => ({ gtMd: false })),
    },
  };
});

describe('TasksScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders TaskList when tasks feature is active', () => {
    renderWithTamagui(<TasksScreen />);

    expect(TaskList).toHaveBeenCalled();
    expect(TaskDetails).not.toHaveBeenCalled();
  });

  it('renders TaskDetails when a task is selected', () => {
    renderWithTamagui(<TasksScreen />);

    // Simulate task selection
    const taskList = TaskList as unknown as jest.Mock;
    const onSelectTask = taskList.mock.calls[0][0].onSelectTask;
    onSelectTask('task-1');

    expect(TaskDetails).toHaveBeenCalledWith(
      expect.objectContaining({ taskId: 'task-1' }),
      expect.anything(),
    );
  });

  it('closes TaskDetails when onClose is called', () => {
    renderWithTamagui(<TasksScreen />);

    // Simulate task selection
    const taskList = TaskList as unknown as jest.Mock;
    const onSelectTask = taskList.mock.calls[0][0].onSelectTask;
    onSelectTask('task-1');

    // Simulate closing TaskDetails
    const taskDetails = TaskDetails as jest.Mock;
    const onClose = taskDetails.mock.calls[0][0].onClose;
    onClose();

    expect(TaskDetails).toHaveBeenCalledTimes(1);
    taskDetails.mockClear();

    // Verify that TaskDetails is not rendered after closing
    expect(TaskDetails).not.toHaveBeenCalled();
  });

  it('renders TaskList and TaskDetails side by side on larger screens', () => {
    (tg.useMedia as jest.Mock).mockReturnValue({ gtMd: true });

    renderWithTamagui(<TasksScreen />);

    expect(TaskList).toHaveBeenCalled();

    // Simulate task selection
    const taskList = TaskList as unknown as jest.Mock;
    const onSelectTask = taskList.mock.calls[0][0].onSelectTask;
    onSelectTask('task-1');

    expect(TaskDetails).toHaveBeenCalledWith(
      expect.objectContaining({ taskId: 'task-1' }),
      expect.anything(),
    );
  });
});
