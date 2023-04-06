import Navigate from "../navigate/Navigate"
import styles from "./styles.module.css"
import logo from "../navigate/image/logo.svg"

export default function Main() {
    return <>
        <Navigate />
        <div className={styles.root}>
            <h1>Redial Trade</h1>
            <p><small>bearing company since of 2012</small></p>
        </div>
    </>
}