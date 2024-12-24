import "styled-components";

declare module "styled-components" {
    export type DefaultTheme = import("./Themes.ts").Mail2Theme;
}
