import { Theme } from "../types/themeTypes";

const defaultTheme: Theme = {
  palette: {
    common: {
      black: "#0f0f0f",
      gray: "#272729",
      pale: "#f0f8f8",
      white: "#fff",
    },
    primary: {
      main: "#A90DE0",
      light: "#F1E1F6",
      dark: "#8E0BBE",
      contrastText: "#5D6970",
    },
    secondary: {
      main: "#7fffd4",
      light: "#49FFC2",
      dark: "#92FFDB",
      contrastText: "#00A983",
    },
    errorColors: {
      main: "#f44",
      light: "#FF5D5D",
      dark: "#e60000",
      contrastText: "#0f0f0f",
    },
    warningColors: {
      main: "#E0E024",
      light: "#F3F346",
      dark: "#E0E024",
      contrastText: "#0f0f0f",
    },
  },
  typography: {
    fontSize: 16,
    fontFamily: "Inter, sans-serif",
    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
    },
  },
};

const Themes = {
  defaultTheme,
};
export { defaultTheme };
export default Themes;
