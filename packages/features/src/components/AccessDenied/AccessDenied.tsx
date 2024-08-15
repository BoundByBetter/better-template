//import { signOut } from "@boundbybetter/backend";
import { tg } from '@boundbybetter/ui';

export function AccessDenied() {
  return (
    <tg.YStack gap="$4" m="$4">
      <tg.H1 textAlign="center">Access Denied</tg.H1>
      <tg.Text f={1} testID="access-denied.message">
        You do not have access. Please click Sign Out and then sign in as a user
        that does.
      </tg.Text>
      <tg.Button
        $gtSm={{ height: '100%' }}
        //onPress={signOut}
        testID="access-denied.sign-out"
      >
        Sign Out
      </tg.Button>
    </tg.YStack>
  );
}
