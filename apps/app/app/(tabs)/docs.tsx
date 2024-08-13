import { EditScreenInfo } from "@boundbybetter/features";
import { tg } from "@boundbybetter/ui";

export default function TabTwoScreen() {
  return (
    <tg.YStack>
      <EditScreenInfo path="app/(tabs)/docs.tsx" />
    </tg.YStack>
  );
}
