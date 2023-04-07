import styles from "./styles.module.css"
import { ThemeContext } from "../../../contexts/ThemeContext/ThemeContext";

export default function Toggle() {
  return (
    <div className={styles.root}>
      <section className={styles.model}>
        <div className={styles.checkbox}>
          <ThemeContext.Consumer>
            {({ theme, setTheme }) => (
              <input type="checkbox"
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
