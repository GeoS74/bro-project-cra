import { date } from "../../../../libs/formatter";
import styles from "./styles.module.css";

export default function OptionalHeader({ createdat }: IContact) {
  return <div className={styles.root}>
    <div>{createdat ? <small>создан {date(createdat)}</small> : <></>}</div>
    <div>
      <small></small>
    </div>
  </div>
}
