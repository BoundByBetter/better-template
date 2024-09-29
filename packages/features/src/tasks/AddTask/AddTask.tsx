import React, { forwardRef, useState } from 'react';
import { useTasks, addTask } from '@boundbybetter/state';
import { nanoid } from '@reduxjs/toolkit';
import { logCall, logSetup, Task, TaskStatus } from '@boundbybetter/shared';
import { logMessage } from '@boundbybetter/shared';
import { tg } from '@boundbybetter/ui';
import { useActiveFeature } from '../../features/useActiveFeature';
import { FeatureKeys } from '../../features/Features';
import { Platform } from 'react-native';

interface AddTaskProps {
  onArrowDown?: () => void;
}

export const AddTask = forwardRef<tg.Input, AddTaskProps>(function AddTask(
  props,
  ref: React.MutableRefObject<tg.Input>,
) {
  logSetup('AddTask');
  const [newTaskName, setNewTaskName] = useState('');
  const tasks = useTasks();

  const createTask = async () => {
    logCall('AddTask', 'createTask');
    const task: Task = {
      id: nanoid(),
      title: newTaskName,
      rating: 5,
      status: TaskStatus.ACTIVE,
      createdAt: new Date().toISOString(),
    };
    addTask(task);
    logMessage('Task saved successfully!', task);
    setNewTaskName('');
  };

  // istanbul ignore next
  const navigateToPurchase = () => {
    // istanbul ignore next
    logMessage('Navigate to purchase');
  };

  /* This code is tested by cypress */
  /* istanbul ignore next */
  const handleKeyPress = (event: any) => {
    if (Platform.OS === 'web') {
      if (event.key === 'Escape') {
        logMessage('Blurring input', ref);
        ref.current?.blur();
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        ref.current?.blur();
        // Notify parent component to select the first task
        props.onArrowDown && props.onArrowDown();
      }
    }
  };

  const taskCount = tasks ? Object.keys(tasks).length : 0;
  const unlimitedTasks = useActiveFeature(FeatureKeys.MyAppTasksUnlimited);
  const canAdd = taskCount < 5 || unlimitedTasks;

  return canAdd ? (
    <tg.XStack gap="$4" ai="center">
      <tg.Input
        ref={ref as React.Ref<tg.Input>}
        onChangeText={(text) => {
          setNewTaskName(text);
        }}
        value={newTaskName}
        placeholder="New Task Name"
        accessibilityLabel="New Task Name"
        flex={1}
        style={{
          borderWidth: 1,
          borderColor: 'red',
        }}
        blurOnSubmit={false}
        testID="new-task-name"
        onSubmitEditing={createTask}
        onKeyPress={handleKeyPress}
      />
      <tg.Button onPress={createTask} testID="new-task-submit">
        Add
      </tg.Button>
    </tg.XStack>
  ) : (
    <tg.YStack gap="$4" ai="center">
      <tg.H3>Free Limit Reached</tg.H3>
      <tg.Paragraph>
        The free version is for evaluation purposes only and only allows up to 5
        tasks. To add more tasks please purchase a license.
      </tg.Paragraph>
      <tg.Button onPress={navigateToPurchase}>Purchase</tg.Button>
    </tg.YStack>
  );
});
