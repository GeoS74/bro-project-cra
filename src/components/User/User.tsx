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

      <form onSubmit={event => _submit(event, editMode, setEditMode)}>
        <div className={classNames(styles.content, "mt-4")}>

          <div>
            <Avatar userPhoto={user.photo} />

            <input type="submit" className="btn btn-outline-light mt-4 mb-2"
              value={editMode ? "Сохранить изменения" : "Редактировать профиль"}
            />
          </div>

          <div><Accordion user={user} editMode={editMode} /></div>

        </div>
      </form>
    </div>
  </>
}

function _submit(
  event: React.FormEvent<HTMLFormElement>,
  editMode: boolean,
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
  ){
  event.preventDefault();
  setEditMode(!editMode);

  if(!editMode) return;

  console.log("change")
  console.log(editMode)

  

  const fd = new FormData(event.currentTarget)
  console.log(fd.get('position'))
}