import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        background: string;
        color: string;
        titleBar: {
            background: string;
            color: string;
        };
    };
}
