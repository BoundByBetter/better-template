import { Post, postDeleted } from "@boundbybetter/shared";
import { useAppDispatch } from "@boundbybetter/state";
import { Button, Card, Stack, Text, YStack } from "@boundbybetter/ui";
import moment from "moment";
import { Platform } from "react-native";

/* eslint-disable-next-line */
export interface PostProps {
  post: Post;
}

export function PostItem(props: PostProps) {
  const dispatch = useAppDispatch();
  const deletePostHandler = () => {
    dispatch(postDeleted(props.post));
  }

  return (
    <YStack gap="$2">
      <Card fd="row" key={props.post.id} testID="post-item">
        <Stack
          f={1}
          p="$4"
          pr="$0"
          $gtSm={{ flexDirection: "row", alignItems: "center" }} 
        >
          <Text f={1} testID="post-item.title">{props.post.title}</Text>
          <Stack
            fd="row"
            mt="$4"
            $gtSm={{ flex: -1, marginTop: "$0", marginLeft: "$4", flexDirection: "row", alignItems: "center" }} 
          >
            <Text
              f={1}
              // Fixes a layout bug on mobile.  if this is set to 1, the title compresses.
              $gtSm={{ flex: /*istanbul ignore next*/Platform.OS === 'web' ? undefined : -1 }}
              fontStyle="italic" 
            >Stewart Armbrecht</Text>
            <Text
              $gtSm={{ alignSelf: "flex-end", paddingRight: "$4"}} 
              pl="$4"
            >{moment(props.post.createdAt).fromNow()}</Text>
          </Stack>
        </Stack>
        <Button 
          $gtSm={{ height: "100%" }} 
          onPress={deletePostHandler}
        >X</Button>
      </Card>
    </YStack>
  );
}
