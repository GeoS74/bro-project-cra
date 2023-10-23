import { Outlet } from "react-router-dom";

import Head from "../Head/Head";
import Navigate from "../navigate/Navigate"
import Footer from "../Footer/Footer"
import styles from "./styles.module.css"

export default function Catalog() {
  return <>
    <Head 
      title="Каталог запчастей компании SIGNAL"
      description="Каталог автомобильных запчастей и запасных частей к спецтехнике компании SIGNAL"
    />
    <Navigate />
    <div className={styles.root} style={{ minHeight: `${window.innerHeight-200}px` }}>
      <h1>Каталог запчастей</h1>
      <hr />
      <Outlet />
    </div>
    <Footer />
  </>
}