import Avatar from "../Avatar/Avatar"
import Accordion from "../Accordion/Accordion"
import styles from "./styles.module.css"
import classNames from "classnames"

type Props = {
  user: IUser
}

export default function Content({ user }: Props) {
  return <div className={styles.root} >
    <h1>Личный кабинет</h1>
    <hr />

    <div className={classNames(styles.content, "mt-4")}>

      <div>
        <Avatar userPhoto={user.photo} />
      </div>

      <div>
        <Accordion user={user} />
      </div>

    </div>
  </div>
}
