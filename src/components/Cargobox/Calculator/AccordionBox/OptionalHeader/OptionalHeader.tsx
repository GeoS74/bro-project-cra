import styles from "./styles.module.css"
import { ReactComponent as IconDelete } from "./icons/trash.svg";

// type Props = {
//   setHidden: React.Dispatch<React.SetStateAction<boolean>>
// }

type Props = {
  delBox: () => void
}

export default function OptionalHeader({delBox}: Props) {
  return <div className={styles.root}
    onClick={() => delBox()}
  >
    <small>Удалить место</small>
    <IconDelete className={styles.svg}/>
  </div> 
}
