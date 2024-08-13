import { PostList } from "../PostList";
import { ScrollView } from "react-native";
import { YStack } from "@boundbybetter/ui";

export function PostsScreen() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ alignSelf: "stretch", margin: 12 }}
    >
      <YStack gap="$4">
        <PostList />
      </YStack>
    </ScrollView>
  );
}
