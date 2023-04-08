import React from "react";

const defaultState: IThemeContext = {
  theme: "dark",
  setTheme: () => null,
};

export const ThemeContext = React.createContext(defaultState as IThemeContext);
