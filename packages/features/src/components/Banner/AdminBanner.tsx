import React from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { tg } from '@boundbybetter/ui';

export function AdminBanner() {
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
    <tg.XStack
      ai="center"
      mt={insets.top}
      ml={insets.left}
      mr={insets.right}
      mb={insets.bottom}
    >
      <tg.View m="$2" ml="$4">
        <Image
          source={require('../../../assets/images/banner-icon.png')}
          style={styles.appIcon}
        />
      </tg.View>
      <tg.H1 m="$2">My Admin</tg.H1>
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
    </tg.XStack>
  );
}
