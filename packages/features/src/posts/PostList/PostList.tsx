import { PostItem } from '../PostItem';
import { AddPost } from '../AddPost';
import { usePosts } from '@boundbybetter/state';
import { tg } from '@boundbybetter/ui';

export function PostList() {
  const posts = usePosts();

  return (
    <tg.YStack gap="$4" mt="$2" testID="post-list">
      <AddPost />
      {posts && posts.map((post) => <PostItem key={post.id} post={post} />)}
    </tg.YStack>
  );
}
