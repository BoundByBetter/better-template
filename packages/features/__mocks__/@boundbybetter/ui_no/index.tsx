/* istanbul ignore file */
import React from 'react';
import { Text as LocalText, View } from 'react-native';
export { TamaguiProvider } from './TamaguiProvider';
export const colors = {
  blue: { blue8: 'hsl(201, 89.7%, 55%)' },
  blueDark: { blue8: 'hsl(201, 89.7%, 55%)' },
};
export const tamaguiConfig = jest.fn();
export const useColorScheme = jest.fn();
export const useMedia = jest.fn();
export const BookOpen = jest.fn();
export const Button = React.forwardRef<View, { children: React.ReactNode }>(({ children }, ref) => (<View ref={ref}>{children}</View>));
export const Info = ({ color, testID }) => <LocalText testID={testID}>Info</LocalText>;
export const MessageCircle = jest.fn();
export const Settings = jest.fn();
export const YStack = ({ children }) => children;
export const H1 = ({ children }) => <LocalText>{children}</LocalText>;
export const H3 = ({ children }) => <LocalText>{children}</LocalText>;
export const Separator = jest.fn();
export const Text = ({ children }) => <LocalText>{children}</LocalText>;
//mock return a getter for accent color
export const useTheme = jest.fn().mockReturnValue({ accentColor: { get: jest.fn() }, backgroundColor: { get: jest.fn() } });
