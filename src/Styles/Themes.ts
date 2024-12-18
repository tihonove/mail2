import { DefaultTheme } from "styled-components";

const themeBaseColors = {
    accentBackground: "#E64524",
    primaryBackground: "#FFFFFF",
};

export const lightTheme: DefaultTheme = {
    step: 5,
    background: themeBaseColors.primaryBackground,
    color: "#000000",
    titleBar: {
        background: themeBaseColors.accentBackground,
        color: "#fff",
    },
};

export const darkTheme: DefaultTheme = {
    background: "#000000",
    color: "#ffffff",
    titleBar: {
        background: "#000",
        color: "#fff",
    },
};

type ThemePropsPeeker<T> = <P>(props: P) => T;

type ThemeHelper<T> = T extends object ? { [K in keyof T]: ThemeHelper<T[K]> } : ThemePropsPeeker<T>;

type ThemePrimitive = string | number;

function buildThemeHelper<T extends DefaultTheme | ThemePrimitive>(
    theme: T,
    fn: ThemePropsPeeker<T>
): ThemeHelper<DefaultTheme> {
    if (typeof theme == "string" || typeof theme == "number") {
        return fn;
    }
    const result: ThemeHelper<T> = {};
    for (const key in theme) {
        result[key] = buildThemeHelper(theme[key], (props) => fn(props)[key]);
    }
    return result;
}

export function step(n: number): string {
    return `${n * 5}px`;
}

export const theme: ThemeHelper<DefaultTheme> = buildThemeHelper(lightTheme, (props) => props.theme);
