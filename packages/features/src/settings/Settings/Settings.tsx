import { tg } from '@boundbybetter/ui';
import {
  useCurrentUser,
  clearCurrentUser,
  clearAllPosts,
} from '@boundbybetter/state';
import { BulkAddButton } from './BulkAddButton';

export function Settings() {
  const user = useCurrentUser();

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
      <tg.Button onPress={handleClearAllPosts} testID="clear-all-posts">
        Clear All Posts
      </tg.Button>
      <BulkAddButton count={5000} />
      <BulkAddButton count={50} />
    </tg.YStack>
  );
}
