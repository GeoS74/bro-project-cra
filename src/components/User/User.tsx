import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import serviceHost from "../../libs/service.host"
import fetchWrapper from "../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../middleware/response.validator"
import tokenManager from "../../classes/TokenManager"
import Navigate from "../navigate/Navigate";
import Avatar from "./Avatar/Avatar"
import Accordion from "./Accordion/Accordion"
import styles from "./styles.module.css"
import classNames from "classnames"

export default function User() {
  const [user, setUser] = useState(useLoaderData() as IUser)
  const [editMode, setEditMode] = useState(false)

  return <>
    <Navigate />

    <div className={styles.root} >
      <h1>Личный кабинет</h1>
      <hr />

      <form onSubmit={event => _updateUserData(event, editMode, setEditMode, (editData) => setUser({...user, ...editData}))}
        className={classNames(styles.content, "mt-4")}>

        <div>
          <Avatar userPhoto={user.photo} />

          <input type="submit" className="btn btn-outline-light mt-4 mb-2"
            value={editMode ? "Сохранить изменения" : "Редактировать профиль"}
          />
        </div>

        <div><Accordion user={user} editMode={editMode} /></div>

      </form>
    </div>
  </>
}

function _updateUserData(
  event: React.FormEvent<HTMLFormElement>,
  editMode: boolean,
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
  setUser: React.Dispatch<React.SetStateAction<IUser>>
) {

  event.preventDefault();
  setEditMode(!editMode);

  if (!editMode) return;

  fetchWrapper(() => fetch(`${serviceHost("informator")}/api/informator/user`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: new FormData(event.currentTarget)
  }))
    .then(responseNotIsArray)
    .then(async (response) => {
      if (response.ok) {
        const res = await response.json()
        setUser(res)
        return;
      }

      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
}