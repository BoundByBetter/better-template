import React, {
  useCallback,
  useMemo,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FlashList } from '@shopify/flash-list';
import { TaskItem } from '../TaskItem';
import { useTasks, useBulkLoadStatus } from '@boundbybetter/state';
import { logCall, logMessage, logSetup } from '@boundbybetter/shared';
import { AddTask } from '../AddTask';
import { tg } from '@boundbybetter/ui';
import { Platform } from 'react-native';

const ItemSeparator = () => <tg.YStack height="$1" />;

function TaskListComponent() {
  logSetup('TaskList');
  const tasks = useTasks();
  const { isBulkLoading, bulkLoadingProgress } = useBulkLoadStatus();
  const inputRef = useRef(null);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(-1);

  const sortedTasks = useMemo(() => {
    logCall('TaskList', 'useMemo');
    return tasks
      ? [...tasks].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      : [];
  }, [tasks]);

  const renderItem = useCallback(
    ({ item, index }) => {
      logCall('TaskList', 'renderItem', item.id);
      return <TaskItem id={item.id} isSelected={index === selectedTaskIndex} />;
    },
    [selectedTaskIndex],
  );

  const keyExtractor = useCallback((item) => {
    logCall('TaskList', 'keyExtractor', item.id);
    return item.id;
  }, []);

  /* Code coverage is handled by the task-keys.cy.ts test */
  /* istanbul ignore next */
  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleKeyPress = (event: KeyboardEvent) => {
        console.log('event', event);
        if (
          event.key === 'n' &&
          !event.ctrlKey &&
          !event.altKey &&
          !event.metaKey
        ) {
          event.preventDefault();
          inputRef.current?.focus();
        } else if (event.key === 'ArrowDown') {
          event.preventDefault();
          setSelectedTaskIndex((prevIndex) => {
            const newIndex =
              prevIndex < sortedTasks.length - 1 ? prevIndex + 1 : prevIndex;
            logMessage('TaskList', 'ArrowDown', newIndex);
            return newIndex;
          });
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          setSelectedTaskIndex((prevIndex) => {
            const newIndex = prevIndex > 0 ? prevIndex - 1 : prevIndex;
            logMessage('TaskList', 'ArrowUp', newIndex);
            return newIndex;
          });
        }
      };
      window.addEventListener('keydown', handleKeyPress);

      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, [sortedTasks.length]);

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
      <AddTask ref={inputRef} />
      <FlashList
        data={sortedTasks}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={55}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={{ paddingRight: 28 }}
        extraData={selectedTaskIndex}
      />
      <tg.Text p="$2" ta="center" fontSize="$3">
        Total Tasks: {sortedTasks.length}
      </tg.Text>
    </tg.YStack>
  );
}

export const TaskList = React.memo(TaskListComponent);
