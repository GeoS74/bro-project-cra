import Navigate from "../navigate/Navigate"
import styles from "./styles.module.css"
import logo from "../navigate/image/logo.svg"

export default function Main() {
    return <>
        <Navigate />
        <div className={styles.root}>
            <img src={logo} loading="lazy" />
            <h3>Поиск позиций</h3>
        </div>
    </>
}