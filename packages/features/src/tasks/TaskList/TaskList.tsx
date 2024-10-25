import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { TaskItem } from '../TaskItem';
import {
  useTaskIds,
  useBulkLoadStatus,
  useDeleteTask,
} from '@boundbybetter/state';
import { logCall, logMessage, logSetup } from '@boundbybetter/shared';
import { AddTask } from '../AddTask';
import { tg } from '@boundbybetter/ui';
import { Platform } from 'react-native';

const ItemSeparator = () => <tg.YStack height="$1" />;

interface TaskListProps {
  onSelectTask: (taskId: string) => void;
}

function TaskListComponent({ onSelectTask }: TaskListProps) {
  logSetup('TaskList');
  const taskIds = useTaskIds();
  const { isBulkLoading, bulkLoadingProgress } = useBulkLoadStatus();
  const addTaskInputRef = useRef(null);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(-1);
  const deleteTask = useDeleteTask();

  const renderItem = useCallback(
    ({ item, index }: { item: string; index: number }) => {
      logCall('TaskList', 'renderItem', item);
      return (
        <TaskItem
          key={item}
          id={item}
          isSelected={index === selectedTaskIndex}
          onSelect={() => {
            setSelectedTaskIndex(index);
            onSelectTask(item);
          }}
          onDelete={() => {
            deleteTask(item);
            /* istanbul ignore next */
            if (index === selectedTaskIndex) {
              setSelectedTaskIndex(-1);
            }
          }}
        />
      );
    },
    [selectedTaskIndex, onSelectTask, deleteTask],
  );

  /* Code coverage is handled by the task-keys.cy.ts test */
  /* istanbul ignore next */
  const handleAddTaskArrowDown = useCallback(() => {
    if (taskIds.length > 0) {
      setSelectedTaskIndex(0);
    }
  }, [taskIds]);

  /* Code coverage is handled by the task-keys.cy.ts test */
  /* istanbul ignore next */
  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleKeyPress = (event: KeyboardEvent) => {
        if (
          event.key === 'n' &&
          !event.ctrlKey &&
          !event.altKey &&
          !event.metaKey
        ) {
          event.preventDefault();
          addTaskInputRef.current?.focus();
        } else if (event.key === 'ArrowDown') {
          event.preventDefault();
          setSelectedTaskIndex((prevIndex) => {
            const newIndex =
              prevIndex < taskIds.length - 1 ? prevIndex + 1 : prevIndex;
            logMessage('TaskList', 'ArrowDown', newIndex);
            return newIndex;
          });
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          setSelectedTaskIndex((prevIndex) => {
            if (prevIndex === 0) {
              // Focus on the Add Task input when the first task is selected
              addTaskInputRef.current?.focus();
              return -1;
            }
            const newIndex = prevIndex > 0 ? prevIndex - 1 : prevIndex;
            logMessage('TaskList', 'ArrowUp', newIndex);
            return newIndex;
          });
        } else if (event.key === 'Delete' || event.key === 'Backspace') {
          event.preventDefault();
          if (selectedTaskIndex !== -1 && taskIds[selectedTaskIndex]) {
            const taskToDelete = taskIds[selectedTaskIndex];
            deleteTask(taskToDelete);
            logMessage('TaskList', 'DeleteTask', taskToDelete);
            setSelectedTaskIndex((prevIndex) => {
              return prevIndex >= taskIds.length - 1
                ? prevIndex - 1
                : prevIndex;
            });
          }
        }
      };
      window.addEventListener('keydown', handleKeyPress);

      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, [taskIds, selectedTaskIndex, deleteTask]);

  if (isBulkLoading) {
    return (
      <tg.YStack flex={1} justifyContent="center" alignItems="center">
        <tg.Text>Loading tasks... {bulkLoadingProgress}%</tg.Text>
        <tg.Progress
          value={bulkLoadingProgress}
          max={100}
          w={200}
          h={20}
          mt={10}
        >
          <tg.Progress.Indicator animation="bouncy" />
        </tg.Progress>
      </tg.YStack>
    );
  }

  return (
    <tg.YStack flex={1} gap="$4" p="$4" testID="task-list">
      <AddTask ref={addTaskInputRef} onArrowDown={handleAddTaskArrowDown} />
      {taskIds.length > 0 ? (
        <FlashList
          data={taskIds}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          estimatedItemSize={55}
          ItemSeparatorComponent={ItemSeparator}
          contentContainerStyle={{ paddingRight: 28 }}
          extraData={selectedTaskIndex}
        />
      ) : (
        <tg.Text>No tasks available. Add a new task to get started!</tg.Text>
      )}
      <tg.Text p="$2" ta="center" fontSize="$3">
        Total Tasks: {taskIds.length}
      </tg.Text>
    </tg.YStack>
  );
}

export const TaskList = React.memo(TaskListComponent);
