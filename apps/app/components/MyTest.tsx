import React from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { H1, XStack } from '@boundbybetter/ui';

export function MyTest() {
  // const dispatch = useAppDispatch();
  // const user = useAppSelector(selectUser);
  // async function handleSignOut() {
  //   await signOut();
  //   dispatch(userLoggedOut());
  // }

  const insets = useSafeAreaInsets();
  
  const styles = StyleSheet.create({
    appIcon: {
      height: 42,
      aspectRatio: 1,
    },
  });
  
  return (
    <XStack ai="center" mt={insets.top} ml={insets.left} mr={insets.right} mb={insets.bottom}>
      <H1 m="$2">My Test</H1>
      {/* <Text style={styles.textLg}>Hello there {user?.userName},</Text>
      <Pressable 
        onPress={handleSignOut}
        style={styles.signOutButton}
      >
        <Text style={[styles.textMd, styles.textCenter]}>Sign Out</Text>
      </Pressable>
      <View>
        <Text>Username: {user?.userName}</Text>
      </View> */}
    </XStack>
  );
}

