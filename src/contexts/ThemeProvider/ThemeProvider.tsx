import { useState } from "react";

import { ThemeContext } from "../ThemeContext/ThemeContext";

const ThemeProvider = ({ children }: { children: JSX.Element }) => {
  const [theme, setTheme] = useState((window.localStorage?.getItem('theme') || 'dark') as StyleTheme);

  document.documentElement.dataset.theme = theme;

  localStorage.setItem("theme", theme);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
