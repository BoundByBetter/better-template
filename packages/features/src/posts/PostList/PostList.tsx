import { PostItem } from "../PostItem";
import { AddPost } from "../AddPost";
import { selectAllPosts, useAppSelector } from "@boundbybetter/state";
import { YStack } from "@boundbybetter/ui";

export function PostList() {
  const posts = useAppSelector(selectAllPosts);

  return (
    <YStack gap="$4" mt="$2" testID="post-list">
      <AddPost />
      {posts && posts.map((post) => <PostItem key={post.id} post={post} />)}
    </YStack>
  );
}
