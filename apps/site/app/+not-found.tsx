import { Link, Stack } from "expo-router";
import { tg } from "@boundbybetter/ui";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <tg.YStack>
        <tg.Text>This screen doesn't exist.</tg.Text>

        <Link href="/">
          <tg.Text>Go to home screen!</tg.Text>
        </Link>
      </tg.YStack>
    </>
  );
}
