import {
  Outlet,
  Link,
} from "react-router-dom";
import styles from "./styles.module.css"

import Navigate from "../navigate/Navigate"

export default function Catalog() {
  return <>
    <Navigate />
    <div className={styles.root}>
      <h1>Каталог</h1>
      <hr />
      <Outlet />
    </div>
  </>
}