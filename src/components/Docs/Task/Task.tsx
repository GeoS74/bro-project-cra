import session from "../../../libs/token.manager"
import finder from "../../../libs/deep.finder"
import styles from "./styles.module.css"

export default function Task() {
    session.subscribe('task')

    return <div className={styles.root} >
        <h3>Мои документы</h3>

        {finder(session.getMe()?.roles, 'Создать') ?
            <button type="button" className="btn btn-outline-light mt-4">Создать документ</button>
            : <></>
        }
    </div>
}
