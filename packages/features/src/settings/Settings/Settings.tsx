import { Button, Text, YStack } from "@boundbybetter/ui";
import { selectUser, useAppDispatch, useAppSelector } from "@boundbybetter/state";
//import { signOut } from "@boundbybetter/backend";
import { userLoggedOut } from "@boundbybetter/shared";

export function Settings() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  async function handleSignOut() {
    //await signOut();
    dispatch(userLoggedOut());
  }
  return (
    <YStack gap="$4" m="$4">
      <Text>Hello there {user?.userName},</Text>
      <Button onPress={handleSignOut}>Sign Out</Button>
    </YStack>
  )
}
