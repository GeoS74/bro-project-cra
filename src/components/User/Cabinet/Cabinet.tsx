import styles from "./styles.module.css"

type Props = {
  user: IUser
}

export default function Content({ user }: Props) {
  return <div className={styles.root}>
    <h1>Личный кабинет</h1>
    <p>email: {user.email}</p>
  </div>
}