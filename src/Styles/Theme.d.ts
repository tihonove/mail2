import "styled-components";

declare module "styled-components" {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    export type DefaultTheme = import("./Themes.ts").Mail2Theme;
}
