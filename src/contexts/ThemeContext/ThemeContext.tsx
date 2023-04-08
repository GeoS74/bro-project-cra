import React from "react";

const defaultState: ITheme = {
  theme: "dark",
  setTheme: (): void => {throw new Error('setContext function must be overridden');},
};

export const ThemeContext = React.createContext(defaultState as ITheme);
