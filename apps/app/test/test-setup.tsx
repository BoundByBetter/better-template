import React from "react";

import "@testing-library/jest-native/extend-expect";
import "react-native-gesture-handler/jestSetup.js";

process.env.LOGGING = "false";

// jest.mock('@react-native-async-storage/async-storage', () =>
//   require('@react-native-async-storage/async-storage/jest/async-storage-mock')
// );

jest.mock(
  "@tamagui/font-inter/otf/Inter-Medium.otf",
  () => "mocked-inter-font",
);
jest.mock(
  "@tamagui/font-inter/otf/Inter-Bold.otf",
  () => "mocked-inter-bold-font",
);

jest.mock("@boundbybetter/state", () => {
  const actual = jest.requireActual("@boundbybetter/state");
  const Provider = jest.requireActual("react-redux").Provider;
  const store = jest.requireActual("@boundbybetter/state").store;
  return {
    ...actual,
    MyData: (props: { children?: React.ReactNode }) => {
      return <Provider store={store}>{props.children}</Provider>;
    },
  };
});
