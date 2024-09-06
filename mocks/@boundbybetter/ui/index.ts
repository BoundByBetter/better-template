import * as actual from '@boundbybetter/ui';
export default {
  ...actual,
  useColorScheme: jest.fn().mockImplementation(() => {
    return actual.useColorScheme;
  }),
};
