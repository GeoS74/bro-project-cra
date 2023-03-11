import { useState } from "react"
import styles from "./styles.module.css"

export default function Access({accessTable, nameUser}: {accessTable: object, nameUser: string}) {   
    const [checkedInput, setCheckedInput] =useState(Object.entries(accessTable)[0][1])
    const nameObjectAccess = Object.entries(accessTable)[0][0]

    return ( <div className={styles.root}>
            <input type="checkbox" defaultChecked={checkedInput} name={nameObjectAccess} onChange={() => setCheckedInput(!checkedInput)}/>
            <label htmlFor={nameObjectAccess + nameUser}>{nameObjectAccess}</label>
        </div>
        )
}