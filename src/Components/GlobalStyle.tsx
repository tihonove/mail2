import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    html {
        padding: 0;
        margin: 0;
    }

    body {
        padding: 0;
        margin: 0;
        background-color: ${(props) => props.theme.background};
        color: ${(props) => props.theme.color};
        transition: all 0.3s linear;
    }
`;
