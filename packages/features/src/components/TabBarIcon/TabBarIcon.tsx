/* istanbul ignore file */

import FontAwesome from "@expo/vector-icons/FontAwesome";

export function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome testID="tab-bar-icon" size={28} style={{ marginBottom: -3 }} {...props} />;
}

