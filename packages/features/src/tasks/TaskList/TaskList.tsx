import React, { useCallback, useMemo } from 'react';
import { FlashList } from '@shopify/flash-list';
import { TaskItem } from '../TaskItem';
import { useTasks, useBulkLoadStatus } from '@boundbybetter/state';
import { logCall, logSetup } from '@boundbybetter/shared';
import { AddTask } from '../AddTask';
import { tg } from '@boundbybetter/ui';

const ItemSeparator = () => <tg.YStack height="$1" />;

function TaskListComponent() {
  logSetup('TaskList');
  const tasks = useTasks();
  const { isBulkLoading, bulkLoadingProgress } = useBulkLoadStatus();

  const sortedTasks = useMemo(() => {
    logCall('TaskList', 'useMemo');
    return tasks
      ? [...tasks].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      : [];
  }, [tasks]);

  const renderItem = useCallback(({ item }) => {
    logCall('TaskList', 'renderItem', item.id);
    return <TaskItem id={item.id} />;
  }, []);

  const keyExtractor = useCallback((item) => {
    logCall('TaskList', 'keyExtractor', item.id);
    return item.id;
  }, []);

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
    <tg.YStack flex={1} gap="$4" p="$4">
      <AddTask />
      <FlashList
        data={sortedTasks}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={55}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={{ paddingRight: 28 }}
      />
      <tg.Text p="$2" ta="center" fontSize="$3">
        Total Tasks: {sortedTasks.length}
      </tg.Text>
    </tg.YStack>
  );
}

export const TaskList = React.memo(TaskListComponent);
