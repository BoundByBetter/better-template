import { Settings } from '@boundbybetter/features';
import { YStack } from '@boundbybetter/ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export default function SettingsTab() {
  const insets = useSafeAreaInsets();
  return (
    <YStack f={1} ml={insets.left} mr={insets.right}>
      <Settings />
    </YStack>
  );
}
