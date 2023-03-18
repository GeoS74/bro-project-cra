import styles from "./styles.module.css"

import users  from "../constants/users"
import User from "../User/User"

export default function TableUsers() {
    console.log(users)
    return ( 
    <div className={styles.root}>
        <h1>Настройки доступа</h1>
        <hr />
        <div className={styles.div_root}>
            <form onSubmit={event => upLoadAccessTable(event)}>
                <input type="submit" className="btn btn-outline-light mt-4 mb-2" value={"Сохранить"}/>
                <div>
                    {users.map((key, index) => {
                    return <User key={index} nameUser={key.name} accessUser={key.access}/>            
                    })}
                </div>
            </form>            
        </div>
        
    </div>
)}

function upLoadAccessTable(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const accessTable: Array<object> = []
    const userAccess = event.currentTarget.querySelectorAll('div.accordion')
    userAccess.forEach((items, indexs) => {        
        const tempArrayAccess: Array<object> = []         
        items.querySelectorAll('input').forEach((item, index) => {
            item.checked ?
            tempArrayAccess[index] = {[item.name]: true} :
            tempArrayAccess[index] = {[item.name]: false}
        })
        items.querySelectorAll('span').forEach((item) => {
            accessTable[indexs] = {id: indexs, name: item.textContent, access: tempArrayAccess}
        });
    });
    console.log(accessTable);
    // fetch ('localhost', {
    //     method: 'PATCH',
    //     headers: {
    //         'Authorization': `Bearer`
    //       }        
    // })
}