import React, { useCallback, useMemo } from 'react';
import { FlashList } from '@shopify/flash-list';
import { PostItem } from '../PostItem';
import { usePosts } from '@boundbybetter/state';
import { logCall, logSetup } from '@boundbybetter/shared';
import { AddPost } from '../AddPost';
import { tg } from '@boundbybetter/ui';
import { Platform } from 'react-native';

const ItemSeparator = () => <tg.YStack height="$1" />;

export function PostList() {
  logSetup('PostList');
  const posts = usePosts();

  const sortedPosts = useMemo(() => {
    logCall('PostList', 'useMemo');
    return posts
      ? [...posts].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      : [];
  }, [posts]);

  const renderItem = useCallback(({ item }) => {
    logCall('PostList', 'renderItem', item.id);
    return <PostItem id={item.id} />;
  }, []);

  const keyExtractor = useCallback((item) => {
    logCall('PostList', 'keyExtractor', item.id);
    return item.id;
  }, []);

  const postCount = sortedPosts.length;

  return (
    <tg.YStack flex={1} gap="$4" p="$4">
      <AddPost />
      <FlashList
        data={sortedPosts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={55}
        removeClippedSubviews={Platform.OS !== 'web'}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={{ paddingRight: 28 }} // Add this line
      />
      <tg.Text p="$2" ta="center" fontSize="$3">
        Total Posts: {postCount}
      </tg.Text>
    </tg.YStack>
  );
}
