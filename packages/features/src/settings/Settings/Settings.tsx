import { tg } from '@boundbybetter/ui';
import {
  useCurrentUser,
  clearCurrentUser,
  clearAllTasks,
  useTaskCount,
  useBulkLoadStatus,
} from '@boundbybetter/state';
import { BulkAddButton } from './BulkAddButton';
import { revokeAsync, fetchDiscoveryAsync,  } from 'expo-auth-session';
import { logMessage } from '@boundbybetter/shared';

export function Settings() {
  const user = useCurrentUser();
  const taskCount = useTaskCount();
  const { isBulkLoading, bulkLoadingProgress } = useBulkLoadStatus();

  async function handleSignOut() {
    try {
      const discovery = await fetchDiscoveryAsync(
        'https://boundbybettercustomers.ciamlogin.com/0009cc7a-b831-4911-be61-58865b14fccb/v2.0',
      );
      logMessage('handleSignOut starting', 'discovery', discovery);
      if (discovery?.endSessionEndpoint) {
        logMessage('handleSignOut revoking', 'discovery', discovery);
        // Redirect to the end session endpoint for logout
        const logoutUrl = `${discovery.endSessionEndpoint}?post_logout_redirect_uri=${encodeURIComponent(window.location.origin)}`;
        window.location.href = logoutUrl; // Redirect to logout
      }
    } catch (error) {
      logMessage('handleSignOut error', error);
    }
    clearCurrentUser();
  }

  async function handleClearAllTasks() {
    clearAllTasks();
  }

  return (
    <tg.YStack gap="$4" m="$4">
      <tg.Text>User Name: {user?.userName}</tg.Text>
      <tg.Text>User Email: {user?.userEmail}</tg.Text>
      <tg.Text>Hello there {user?.userName},</tg.Text>
      <tg.Button onPress={handleSignOut}>Sign Out</tg.Button>
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
