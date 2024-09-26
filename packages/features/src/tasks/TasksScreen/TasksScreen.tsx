import { TaskList } from '../TaskList';
import { tg } from '@boundbybetter/ui';

export function TasksScreen() {
  return (
    <tg.YStack gap="$4" flex={1}>
      <TaskList />
    </tg.YStack>
  );
}
