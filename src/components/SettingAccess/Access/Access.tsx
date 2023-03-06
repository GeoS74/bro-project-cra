import styles from "./styles.module.css"

export default function Access({accessTable, nameUser}: {accessTable: object, nameUser: string}) {    
    const nameObjectAccess = Object.entries(accessTable)[0][0]
    const valueObjectAccess = Object.entries(accessTable)[0][1]
    console.log(nameObjectAccess, valueObjectAccess)
    if (valueObjectAccess === true) {
        return (
            <div className={styles.root}>
                <p>{nameObjectAccess + ":"}</p>
                <input type="radio" name={nameObjectAccess + nameUser} id={nameObjectAccess + nameUser + "1"} value="true" defaultChecked/>
                <label htmlFor={nameObjectAccess + nameUser + "1"}>Включить</label>
                <input type="radio" name={nameObjectAccess + nameUser} id={nameObjectAccess + nameUser + "2"} value="false"/>
                <label htmlFor={nameObjectAccess + nameUser + "2"}>Выключить</label>
            </div>
        )
    } else {
        return (
            <div className={styles.root}>
                <p>{nameObjectAccess + ":"}</p>
                <input type="radio" name={nameObjectAccess + nameUser} id={nameObjectAccess + nameUser + "1"} value="true"/>
                <label htmlFor={nameObjectAccess + nameUser + "1"}>Включить</label>
                <input type="radio" name={nameObjectAccess + nameUser} id={nameObjectAccess + nameUser + "2"} value="false" defaultChecked/>
                <label htmlFor={nameObjectAccess + nameUser + "2"}>Выключить</label>
            </div>
        )
    }
    
}