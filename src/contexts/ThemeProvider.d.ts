type StyleTheme = "dark" | "light";

interface ITheme {
    theme: StyleTheme;
    setTheme: Dispatch<SetStateAction<StyleTheme>>;
}