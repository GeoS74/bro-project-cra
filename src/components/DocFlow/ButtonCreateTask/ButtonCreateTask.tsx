import styles from "./styles.module.css"
import { Link } from "react-router-dom";


export default function ButtonCreateTask() {
    return (
        <Link to="/docflow/createTasks" className={styles.root}>
            <div className={styles.createElement}>Создать документ</div>
        </Link>
    )
}