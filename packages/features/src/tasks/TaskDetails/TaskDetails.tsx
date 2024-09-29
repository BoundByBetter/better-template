import React from 'react';
import { tg } from '@boundbybetter/ui';
import { useTask } from '@boundbybetter/state';
import moment from 'moment';
import { logCall, logSetup } from '@boundbybetter/shared';

interface TaskDetailsProps {
  taskId: string | null;
  onClose: () => void;
}

export function TaskDetails({ taskId, onClose }: TaskDetailsProps) {
  logSetup('TaskDetails', 'render', 'taskId', taskId);
  const task = useTask(taskId || '');

  if (!task) {
    logCall('TaskDetails', 'render', 'task not found');
    return null;
  }

  return (
    <tg.YStack gap="$4" p="$4" testID="task-details">
      <tg.XStack justifyContent="space-between" alignItems="center">
        <tg.H3 testID="task-details-title">{task.title}</tg.H3>
        <tg.Button testID="task-details-close" onPress={onClose}>
          Close
        </tg.Button>
      </tg.XStack>
      <tg.Separator />
      <tg.Text testID="task-details-status">Status: {task.status}</tg.Text>
      <tg.Text testID="task-details-rating">Rating: {task.rating}</tg.Text>
      <tg.Text testID="task-details-content">
        Content: {task.content || 'No content'}
      </tg.Text>
      <tg.Text testID="task-details-created">
        Created: {moment(task.createdAt).format('MMMM D, YYYY h:mm A')}
      </tg.Text>
      <tg.Text testID="task-details-updated">
        Updated: {moment(task.updatedAt).format('MMMM D, YYYY h:mm A')}
      </tg.Text>
    </tg.YStack>
  );
}
