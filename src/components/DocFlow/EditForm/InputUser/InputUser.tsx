import styles from './styles.module.css'

import serviceHost from "../../../../libs/service.host"
import fetchWrapper from "../../../../libs/fetch.wrapper"
import tokenManager from "../../../../libs/token.manager"
import session from "../../../../libs/token.manager";

export default async function InputUser() {
    const userJson = await _getUser()
    console.log(userJson)
    return (
        <div className={styles.root}>
            <label htmlFor="inputDropBox">Список подписантов</label>
            <input type="text" list="dropBox" id="inputDropBox"/>
            <datalist id="dropBox">
                <option value="Иван"></option>
                <option value="Петр"></option>
                <option value="Алексей"></option>
                <option value="Гоша"></option>
                <option value="Рома"></option>
            </datalist>
        </div>
    )
}


async function _getUser() {
    return fetch(`${serviceHost("informator")}/api/informator/user/all`, {
        headers: {
          'Authorization': `Bearer ${tokenManager.getAccess()}`
        }
      }).then(async res => await res.json())
}