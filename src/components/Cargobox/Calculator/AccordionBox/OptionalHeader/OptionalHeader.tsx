import styles from "./styles.module.css"
import { ReactComponent as IconDelete } from "./icons/trash.svg";

export default function OptionalHeader() {
  return <div className={styles.root}>
    <small>Удалить место</small>
    <IconDelete className={styles.svg}/>
  </div> 
}
