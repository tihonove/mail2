import { styled, ThemeProvider, DefaultTheme } from "styled-components";
import { lightTheme, darkTheme } from "../Styles/Themes.ts";
import { atom, useAtom } from "jotai";
import * as remote from "@electron/remote";
import { MainWindow } from "./MainWindow.tsx";
import { GlobalStyle } from "./GlobalStyle.tsx";

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

const CustomTitleBar = () => {
    const minimize = () => {
        remote.getCurrentWindow().minimize();
    };
    const close = () => {
        remote.getCurrentWindow().close();
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#333",
                color: "#fff",
                padding: "5px 10px",
                WebkitAppRegion: "drag", // Перетаскивание окна
            }}
        >
            <div style={{ WebkitAppRegion: "no-drag" }}>
                {" "}
                {/* Отключение перетаскивания для кнопок */}
                My App
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
                <button
                    onClick={minimize}
                    style={{
                        background: "red",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                        WebkitAppRegion: "no-drag", // Исключить из области перетаскивания
                    }}
                >
                    _
                </button>
                <button
                    onClick={close}
                    style={{
                        background: "red",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                        WebkitAppRegion: "no-drag", // Исключить из области перетаскивания
                    }}
                >
                    X
                </button>
            </div>
        </div>
    );
};

const ToggleButton = styled.button`
    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.color};
    border: 1px solid ${(props) => props.theme.color};
    padding: 10px;
    cursor: pointer;
    margin: 20px;
`;

export function App(): React.JSX.Element {
    const [theme, setTheme] = useAtom(themeAtom);

    const handleToggleTheme = () => {
        setTheme(theme === ThemeName.Light ? ThemeName.Dark : ThemeName.Light);
    };

    return (
        <ThemeProvider theme={resolveTheme(theme)}>
            <GlobalStyle />
            {/* <CustomTitleBar /> */}
            <MainWindow />
        </ThemeProvider>
    );
}
