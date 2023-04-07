import React from "react";
import { ThemeContext, themes } from "../ThemeContext/ThemeContext";
import { useState } from "react";


const ThemeProvider = ({ children }: { children: JSX.Element }) => {
    const [theme, setTheme] = useState(window?.localStorage?.getItem('theme') || themes.dark);
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
    console.log(theme);
    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
