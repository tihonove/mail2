import * as React from "react";
import { styled, ThemeProvider, createGlobalStyle, DefaultTheme } from "styled-components";
import { lightTheme, darkTheme } from "./Themes.ts";
import { atom, useAtom } from "jotai";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.color};
    transition: all 0.3s linear;
  }
`;

const ToggleButton = styled.button`
    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.color};
    border: 1px solid ${(props) => props.theme.color};
    padding: 10px;
    cursor: pointer;
    margin: 20px;
`;

enum ThemeName {
    Light = "Light",
    Dark = "Dark",
}

const themeAtom = atom<ThemeName | undefined>(undefined);

function resolveTheme(theme: ThemeName | undefined): DefaultTheme {
    switch (theme) {
        case ThemeName.Light:
            return lightTheme;
        case ThemeName.Dark:
            return darkTheme;
        default:
            return lightTheme;
    }
}

export function App(): React.JSX.Element {
    const [theme, setTheme] = useAtom(themeAtom);

    const handleToggleTheme = () => {
        setTheme(theme === ThemeName.Light ? ThemeName.Dark : ThemeName.Light);
    };

    return (
        <ThemeProvider theme={resolveTheme(theme)}>
            <GlobalStyle />
            <div>
                <ToggleButton onClick={handleToggleTheme}>Toggle Theme</ToggleButton>
                Hello, world!
            </div>
        </ThemeProvider>
    );
}
