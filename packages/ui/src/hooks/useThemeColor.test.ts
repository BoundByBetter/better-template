import { Colors } from '../constants/Colors';
import { useThemeColor } from './useThemeColor';
import { useColorScheme } from 'react-native';

jest.mock('react-native', () => ({
  useColorScheme: jest.fn(),
}));

describe('useThemeColor', () => {
  it('should return the light color when the color scheme is light and the light color is provided', () => {
    (useColorScheme as jest.Mock).mockReturnValue('light');

    const lightColor = 'lightColor';
    const darkColor = 'darkColor';
    const colorName = 'text';

    const result = useThemeColor(
      { light: lightColor, dark: darkColor },
      colorName,
    );

    expect(result).toBe(lightColor);
  });

  it('should return the dark color when the color scheme is dark and the dark color is provided', () => {
    (useColorScheme as jest.Mock).mockReturnValue('dark');

    const lightColor = 'lightColor';
    const darkColor = 'darkColor';
    const colorName = 'text';

    const result = useThemeColor(
      { light: lightColor, dark: darkColor },
      colorName,
    );

    expect(result).toBe(darkColor);
  });

  it('should return the light color from the Colors object when the color scheme is light and the light color is not provided', () => {
    (useColorScheme as jest.Mock).mockReturnValue('light');

    const lightColor = undefined;
    const darkColor = 'darkColor';
    const colorName = 'text';

    const result = useThemeColor(
      { light: lightColor, dark: darkColor },
      colorName,
    );

    expect(result).toBe(Colors.light.text);
  });

  it('should return the dark color from the Colors object when the color scheme is dark and the dark color is not provided', () => {
    (useColorScheme as jest.Mock).mockReturnValue('dark');

    const lightColor = 'lightColor';
    const darkColor = undefined;
    const colorName = 'text';

    const result = useThemeColor(
      { light: lightColor, dark: darkColor },
      colorName,
    );

    expect(result).toBe(Colors.dark.text);
  });
  it('should use the light color scheme when userColorScheme is undefined', () => {
    (useColorScheme as jest.Mock).mockReturnValue(undefined);

    const lightColor = 'lightColor';
    const darkColor = 'darkColor';
    const colorName = 'text';

    const result = useThemeColor(
      { light: lightColor, dark: darkColor },
      colorName,
    );

    expect(result).toBe(lightColor);
  });
});
