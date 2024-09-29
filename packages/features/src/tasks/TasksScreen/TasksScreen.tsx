import React, { useState } from 'react';
import { TaskList } from '../TaskList';
import { TaskDetails } from '../TaskDetails';
import { tg } from '@boundbybetter/ui';
import { logCall, logSetup } from '@boundbybetter/shared';

export function TasksScreen() {
  logSetup('TasksScreen');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const media = tg.useMedia();

  const handleSelectTask = (taskId: string) => {
    logCall('TasksScreen', 'handleSelectTask', { taskId });
    setSelectedTaskId(taskId);
  };

  const handleCloseDetails = () => {
    logCall('TasksScreen', 'handleCloseDetails');
    setSelectedTaskId(null);
  };

  if (media.gtMd) {
    logCall(
      'TasksScreen',
      'render',
      'large screen',
      'selectedTaskId',
      selectedTaskId,
    );
    return (
      <tg.XStack gap="$4" flex={1}>
        <tg.YStack gap="$4" flex={1}>
          <TaskList onSelectTask={handleSelectTask} />
        </tg.YStack>
        {selectedTaskId && (
          <tg.YStack gap="$4" flex={1}>
            <TaskDetails taskId={selectedTaskId} onClose={handleCloseDetails} />
          </tg.YStack>
        )}
      </tg.XStack>
    );
  }

  logCall(
    'TasksScreen',
    'render',
    'medium or small screen',
    'selectedTaskId',
    selectedTaskId,
  );
  return (
    <tg.YStack gap="$4" flex={1}>
      {selectedTaskId ? (
        <TaskDetails taskId={selectedTaskId} onClose={handleCloseDetails} />
      ) : (
        <TaskList onSelectTask={handleSelectTask} />
      )}
    </tg.YStack>
  );
}
