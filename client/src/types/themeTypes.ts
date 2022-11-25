// Theme related types
type Theme = {
  palette: Palette;
  typography: Typography;
};

type MockTheme = {
  palette?: MockPalette;
  typography?: MockTypography;
};

type Palette = {
  common: CommonColorObject;
  primary: ColorObject;
  secondary: ColorObject;
  errorColors: ColorObject;
  warningColors: ColorObject;
};

type MockPalette = {
  common?: CommonColorObject;
  primary?: ColorObject;
  secondary?: ColorObject;
  errorColors?: ColorObject;
  warningColors?: ColorObject;
};

// used for colors that are supposed to stand out
type ColorObject = {
  main: string;
  light: string;
  dark: string;
  contrastText?: string;
};

type MockColorObject = {
  main?: string;
  light?: string;
  dark?: string;
  contrastText?: string;
};
// used for backgrounds, shadows, etc.
type CommonColorObject = {
  black: string;
  white: string;
  gray: string;
  pale: string;
};
type MockCommonColorObject = {
  black?: string;
  white?: string;
  gray?: string;
  pale?: string;
};

type Typography = {
  fontSize: number;
  fontFamily: string;
  fontWeights: fontWeights;
};

type MockTypography = {
  fontSize?: number;
  fontFamily?: string;
  fontWeights?: fontWeights;
};
type fontWeights = {
  light: number;
  regular: number;
  medium: number;
  semiBold: number;
  bold: number;
};

export { type Theme, type MockTheme };
