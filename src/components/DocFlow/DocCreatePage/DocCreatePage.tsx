import { useState } from "react";
import DocSelectType from "../DocSelectType/DocSelectType";

import styles from "./styles.module.css"

export default function DocCreatePage(){
  const [showForm, setShowForm] = useState(false);

  return <DocSelectType setShowForm={setShowForm}/>
}