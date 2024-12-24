import { createGlobalStyle } from "styled-components";
import { theme } from "../Styles/Themes.ts";

export const GlobalStyle = createGlobalStyle`
    html {
        padding: 0;
        margin: 0;
    }

    body {
        padding: 0;
        margin: 0;
        background-color: ${theme.background};
        color: ${theme.color};
        transition: all 0.3s linear;
    }
`;
