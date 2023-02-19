import serviceHost from "../../../libs/service.host"
import person from "../image/person.svg"
import styles from "./styles.module.css"

type Props = {
    user: IUser
  }

export default function Photo({user}: Props) {
    return (
        <form action="" className={styles.root}>
            {user.photo ? <img src={`${serviceHost('informator')}/api/informator/user/photo/${user.photo}`} loading="lazy" /> : <img src={person} loading="lazy" />}
            <div>
                <input type="file" accept="image/*"/>
                <input type="submit" />
            </div>
        </form>
            
    )
}