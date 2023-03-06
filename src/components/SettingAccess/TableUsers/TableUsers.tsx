import styles from "./styles.module.css"

import users  from "../constants/users"
import User from "../User/User"

export default function TableUsers() {
    console.log(users)
    return ( 
    <div className={styles.root}>
        <h1>Настройки доступа</h1>
        <hr />
        {users.map((key, index) => {
            return <User key={index} nameUser={key.name} accessUser={key.access}/>            
            })}
    </div>
)}