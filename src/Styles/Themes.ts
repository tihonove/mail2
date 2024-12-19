import { DefaultTheme } from "styled-components";

const themeBaseColors = {
    accentBackground: "#E64524",
    primaryBackground: "#FFFFFF",
};

export const lightTheme = {
    step: 5,
    background: themeBaseColors.primaryBackground,
    hoverBackground1: "#f0f0f0",
    color: "#000000",
    titleBar: {
        background: themeBaseColors.accentBackground,
        color: "#fff",
    },
};

export type Mail2Theme = typeof lightTheme;

export const darkTheme: Mail2Theme = {
    step: 5,
    background: "#000000",
    color: "#ffffff",
    hoverBackground1: "#f0f0f0",
    titleBar: {
        background: "#000",
        color: "#fff",
    },
};

type ThemePropsPeeker<T> = <P>(props: P) => T;

type ThemeHelper<T> = T extends object ? { [K in keyof T]: ThemeHelper<T[K]> } : ThemePropsPeeker<T>;

type ThemePrimitive = string | number;

function buildThemeHelper<T extends object | ThemePrimitive>(theme: T, fn: ThemePropsPeeker<T>): ThemeHelper<T> {
    if (typeof theme === "string" || typeof theme === "number") {
        return fn as ThemeHelper<T>;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = {};
    for (const key in theme) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        result[key] = buildThemeHelper(theme[key], (props) => fn(props)[key]);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result;
}

export function step(n: number): string {
    return `${(n * 5).toString()}px`;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return
export const theme: ThemeHelper<DefaultTheme> = buildThemeHelper(lightTheme, (props) => props.theme);
