import { Theme } from "./themeTypes";
import "styled-components";

type CustomTheme = typeof Theme;

declare module "styled-components" {
  export interface DefaultTheme extends CustomTheme {}
}
