import { tg } from '@boundbybetter/ui';
import { useCurrentUser, updateCurrentUser } from '@boundbybetter/state';
import { userLoggedOut } from '@boundbybetter/shared';

export function Settings() {
  const user = useCurrentUser();
  
  async function handleSignOut() {
    updateCurrentUser(null);
    // Dispatch userLoggedOut action if needed
  }

  return (
    <tg.YStack gap="$4" m="$4">
      <tg.Text>User Name: {user?.userName}</tg.Text>
      <tg.Text>User Email: {user?.userEmail}</tg.Text>
      <tg.Text>Hello there {user?.userName},</tg.Text>
      <tg.Button onPress={handleSignOut}>Sign Out</tg.Button>
    </tg.YStack>
  );
}
