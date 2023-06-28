import styles from "./styles.module.css"

type Props = {
  directing: ISimpleRow
  task?: ISimpleRow
}

export default function OptionalHeader({ directing, task }: Props) {
  return <div className={styles.root}>
    <div></div>
    <div>
      <small>{directing.title} / {task?.title}</small>
    </div>
  </div>
}
