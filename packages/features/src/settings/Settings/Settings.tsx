import { tg } from '@boundbybetter/ui';
import {
  useClearAllTasks,
  useTaskCount,
  useBulkLoadStatus,
} from '@boundbybetter/state';
import { BulkAddButton } from './BulkAddButton';
import { useCurrentUser } from '@boundbybetter/auth';
import { useLogOut } from '@boundbybetter/auth'; // Import the useLogOut hook

export function Settings() {
  const user = useCurrentUser();
  const taskCount = useTaskCount();
  const { isBulkLoading, bulkLoadingProgress } = useBulkLoadStatus();
  const clearAllTasks = useClearAllTasks();
  const logOut = useLogOut(); // Use the useLogOut hook

  async function handleClearAllTasks() {
    clearAllTasks();
  }

  return (
    <tg.YStack gap="$4" m="$4">
      <tg.Text>User Name: {user?.userName}</tg.Text>
      <tg.Text>User Email: {user?.userEmail}</tg.Text>
      <tg.Text>Hello there {user?.userName},</tg.Text>
      <tg.Button onPress={logOut}>Log Out</tg.Button>
      {isBulkLoading ? (
        <tg.YStack gap="$2" alignItems="center">
          <tg.Text>Loading tasks... {bulkLoadingProgress}%</tg.Text>
          <tg.Progress value={bulkLoadingProgress} max={100} w={200} h={20}>
            <tg.Progress.Indicator animation="bouncy" />
          </tg.Progress>
        </tg.YStack>
      ) : (
        <>
          <tg.Button onPress={handleClearAllTasks} testID="clear-all-tasks">
            {`Clear All ${taskCount.toString()} Tasks`}
          </tg.Button>
          <BulkAddButton count={5000} />
          <BulkAddButton count={50} />
          <BulkAddButton count={1} />
        </>
      )}
    </tg.YStack>
  );
}
