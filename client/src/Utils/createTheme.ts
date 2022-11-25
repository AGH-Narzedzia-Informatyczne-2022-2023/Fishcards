import { merge } from "lodash";
import { MockTheme, Theme } from "../types/themeTypes";
import { defaultTheme } from "./themes";

const createTheme = (newTheme: MockTheme): Theme => {
  return merge(defaultTheme, newTheme);
};
export default createTheme;
