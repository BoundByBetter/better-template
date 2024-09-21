import { tg } from '@boundbybetter/ui';
import {
  useCurrentUser,
  clearCurrentUser,
  clearAllPosts,
  usePostCount,
  useBulkLoadStatus,
} from '@boundbybetter/state';
import { BulkAddButton } from './BulkAddButton';

export function Settings() {
  const user = useCurrentUser();
  const postCount = usePostCount();
  const { isBulkLoading, bulkLoadingProgress } = useBulkLoadStatus();

  async function handleSignOut() {
    clearCurrentUser();
    // Dispatch userLoggedOut action if needed
  }

  async function handleClearAllPosts() {
    clearAllPosts();
  }

  return (
    <tg.YStack gap="$4" m="$4">
      <tg.Text>User Name: {user?.userName}</tg.Text>
      <tg.Text>User Email: {user?.userEmail}</tg.Text>
      <tg.Text>Hello there {user?.userName},</tg.Text>
      <tg.Button onPress={handleSignOut}>Sign Out</tg.Button>
      {isBulkLoading ? (
        <tg.YStack gap="$2" alignItems="center">
          <tg.Text>Loading posts... {bulkLoadingProgress}%</tg.Text>
          <tg.Progress value={bulkLoadingProgress} max={100} w={200} h={20}>
            <tg.Progress.Indicator animation="bouncy" />
          </tg.Progress>
        </tg.YStack>
      ) : (
        <>
          <tg.Button onPress={handleClearAllPosts} testID="clear-all-posts">
            {`Clear All ${postCount.toString()} Posts`}
          </tg.Button>
          <BulkAddButton count={5000} />
          <BulkAddButton count={50} />
          <BulkAddButton count={1} />
        </>
      )}
    </tg.YStack>
  );
}
