import { render } from "@testing-library/react-native";
import { tamaguiConfig, tg } from "@boundbybetter/ui";

export const renderWithTamagui: typeof render = (component) => {
  return render(
    <tg.TamaguiProvider config={tamaguiConfig}>{component}</tg.TamaguiProvider>,
  );
};
