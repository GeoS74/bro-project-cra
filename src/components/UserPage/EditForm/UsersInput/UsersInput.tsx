import { useState } from "react"
import styles from "./styles.module.css"

export default function UsersInput() {
    const [listUsers, setListUsers] = useState([])
    return (
    <div className={styles.root}>
        <div className={styles.panel}>
            {listUsers.length === 0 
            ? <button>Добавить Подписанта</button> 
            : <div>
                {listUsers.map((value, index) => <p key={index}>{value}</p>)}
                <button>Добавить Подписанта</button>
            </div>
            }
            {/* <p>1. Vova</p>
            <p>2. Kolya</p>
            <p>3. Sasha</p>
            <button>Добавить Подписанта</button> */}
        </div>
        <div className={styles.panel}>
            <p>1. Masha</p>
            <p>2. Ivan</p>
            <p>3. Leha</p>
            <button>Добавить Ознакомителя</button>
        </div>
        
    </div>
)}