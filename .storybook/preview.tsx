import type { Preview } from "@storybook/react";
import "../src/Styles/Reset.css";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../src/Styles/Themes.ts";
import { GlobalStyle } from "../src/Components/GlobalStyle.tsx";

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [
        (Story) => (
            <ThemeProvider theme={lightTheme}>
                <GlobalStyle />
                <Story />
            </ThemeProvider>
        ),
    ],
};

export default preview;
