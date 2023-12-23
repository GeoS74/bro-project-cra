import { date } from "../../../../libs/formatter";
import styles from "./styles.module.css";

export default function OptionalHeader({ createdat }: IContact) {
  return <div className={styles.root}>
    <div>{createdat ? <small>добавлен {date(createdat)}</small> : <></>}</div>
    <div>
      <small></small>
    </div>
  </div>
}
