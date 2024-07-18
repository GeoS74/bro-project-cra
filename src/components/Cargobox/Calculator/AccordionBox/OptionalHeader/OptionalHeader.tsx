import styles from "./styles.module.css"
import { ReactComponent as IconDelete } from "./icons/trash.svg";

type Props = {
  setHidden: React.Dispatch<React.SetStateAction<boolean>>
}

export default function OptionalHeader({setHidden}: Props) {
  return <div className={styles.root}
    onClick={() => setHidden(true)}
  >
    <small>Удалить место</small>
    <IconDelete className={styles.svg}/>
  </div> 
}
