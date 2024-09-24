import React, { useCallback, useMemo } from 'react';
import { FlashList } from '@shopify/flash-list';
import { PostItem } from '../PostItem';
import { usePosts, useBulkLoadStatus } from '@boundbybetter/state';
import {
  logCall,
  logGroup,
  logGroupEnd,
  logSetup,
} from '@boundbybetter/shared';
import { AddPost } from '../AddPost';
import { tg } from '@boundbybetter/ui';

const ItemSeparator = () => <tg.YStack height="$1" />;

function PostListComponent() {
  logGroup('PostList');
  logSetup('PostList');
  const posts = usePosts();
  const { isBulkLoading, bulkLoadingProgress } = useBulkLoadStatus();

  const sortedPosts = useMemo(() => {
    logCall('PostList', 'useMemo');
    return posts
      ? [...posts].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      : [];
  }, [posts]);

  const renderItem = useCallback(({ item }) => {
    logGroup('PostList renderItem');
    logCall('PostList', 'renderItem', item.id);
    return <PostItem id={item.id} />;
  }, []);

  const keyExtractor = useCallback((item) => {
    logGroup('PostList keyExtractor');
    logCall('PostList', 'keyExtractor', item.id);
    return item.id;
  }, []);

  if (isBulkLoading) {
    return (
      <tg.YStack flex={1} justifyContent="center" alignItems="center">
        <tg.Text>Loading posts... {bulkLoadingProgress}%</tg.Text>
        <tg.Progress
          value={bulkLoadingProgress}
          max={100}
          w={200}
          h={20}
          mt={10}
        >
          <tg.Progress.Indicator animation="bouncy" />
        </tg.Progress>
      </tg.YStack>
    );
  }

  return (
    <tg.YStack flex={1} gap="$4" p="$4">
      <AddPost />
      <FlashList
        data={sortedPosts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={55}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={{ paddingRight: 28 }}
      />
      <tg.Text p="$2" ta="center" fontSize="$3">
        Total Posts: {sortedPosts.length}
      </tg.Text>
    </tg.YStack>
  );
}

export const PostList = React.memo(PostListComponent);
