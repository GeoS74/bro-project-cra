import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import styles from "./styles.module.css"

export default function AccessSetting() {
  const [dataAccess, setDataAccess] = useState(useLoaderData() as IRow[][])
  console.log(dataAccess)

  return <div className={styles.root}>
    <h3>Настройки прав доступа</h3>
  </div>
}