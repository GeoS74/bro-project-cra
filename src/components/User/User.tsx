import { useState } from "react";
import { useLoaderData } from "react-router-dom";

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

      <div className={classNames(styles.content, "mt-4")}>
        <div>
          <Avatar userPhoto={user.photo} />

          <input type="submit" className="btn btn-outline-light mt-4 mb-2"
            value={editMode ? "Сохранить изменения" : "Редактировать профиль"}
            onClick={event => {
              (event.currentTarget.parentElement?.nextElementSibling?.querySelector('input[type=submit]') as HTMLInputElement).click()
            }}
          />
        </div>

        <div><Accordion user={user} setUser={setUser} editMode={editMode} setEditMode={setEditMode} /></div>
      </div>
    </div>
  </>
}
