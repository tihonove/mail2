import * as remote from "@electron/remote";
import { atom, useAtom } from "jotai";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../Styles/Themes.ts";
import { GlobalStyle } from "./GlobalStyle.tsx";
import { MainWindow } from "./MainWindow.tsx";

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

    const handleClose = () => {
        remote.getCurrentWindow().close();
    };
    const handleMinimize = () => {
        remote.getCurrentWindow().minimize();
    };
    const handleMaximize = () => {
        remote.getCurrentWindow().maximize();
    };

    return (
        <ThemeProvider theme={resolveTheme(theme)}>
            <GlobalStyle />
            <MainWindow onClose={handleClose} onMinimize={handleMinimize} onMaximize={handleMaximize} />
        </ThemeProvider>
    );
}
