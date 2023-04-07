import styles from "./styles.module.css"
import { ThemeContext, themes } from "../../../contexts/ThemeContext/ThemeContext";

export default function Toggle() {
    console.log(ThemeContext);
    console.log(themes);
    return (
        <div>
            <section className={styles.model}>
                <div className={styles.checkbox}>
                    <ThemeContext.Consumer>
                    {({ theme, setTheme }) => (
                                <input
                                    type="checkbox"
                                    onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
                                />
                            )}
                    </ThemeContext.Consumer>
                    <label></label>
                </div>
            </section>
        </div>
    )
}
