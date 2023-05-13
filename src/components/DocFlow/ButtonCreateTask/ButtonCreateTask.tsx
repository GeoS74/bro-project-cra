import styles from "./styles.module.css"
import { Link } from "react-router-dom";


type Props = {
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>
    addDoc?: ((row: IDoc) => void) | undefined
  }

export default function ButtonCreateTask({ setShowForm, addDoc }: Props) {
    console.log(setShowForm)
    console.log(addDoc)
    return (
        <Link to="/docflow/createTasks" className={styles.root} state={{setShowForm: setShowForm , addDoc: addDoc} }>
            <div className={styles.createElement}>Создать документ</div>
        </Link>
    )
}