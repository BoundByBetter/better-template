import { View } from 'react-native';
import { Image } from 'expo-image';

export function WebSplashScreen() {
  return (
    <View style={{ flex: 1 }} testID="web-splash-screen">
      <Image
        source={require('../../../assets/images/splash.png')}
        style={{ flex: 1 }}
      />
    </View>
  );
}
