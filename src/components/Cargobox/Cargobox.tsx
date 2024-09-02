import { Outlet } from "react-router-dom";

import Head from "../Head/Head";
import Navigate from "../navigate/Navigate";
import Footer from "../Footer/Footer"
import styles from "./styles.module.css"

export default function DocFlow() {
  return <>
    <Head
      title="Каталог автозапчастей компании SIGNAL"
      description="Каталог автозапчастей и запасных частей к спецтехнике компании SIGNAL"
    />
    <Navigate />
    <div className={styles.root} >
      <h1>Расчёт стоимости доставки</h1>
      <hr />
      <Outlet />
    </div>
    <Footer />
  </>
}