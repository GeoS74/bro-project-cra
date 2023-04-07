import React from "react";

export const themes = {
    dark: "dark",
    light: "light",
};

const defaultState = {
    theme: "dark",
};

export const ThemeContext = React.createContext<ITheme>(defaultState);
