import { useState } from "react";

import EditButton from "../EditButton/EditButton";
import serviceHost from "../../../libs/service.host"
import styles from "./styles.module.css"

type Props = {
  about: IAbout | undefined
  setAbout: React.Dispatch<React.SetStateAction<IAbout | undefined>>
  editMode: boolean
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
}



export default function EditForm({ about, setAbout, editMode, setEditMode }: Props) {
  return <form
    onSubmit={(event) => { _onSubmit(event, setEditMode, about, setAbout) }}
    className={styles.root}>

    <EditButton editMode={editMode} />

    <div className="form-group">
      <label className="form-label mt-4">Редактировать  страницу (markdown)</label>
      <textarea className="form-control" name="mdInfo" defaultValue={about?.mdInfo || ""}></textarea>
      <input type="hidden" name="alias" defaultValue="company" />
    </div>
  </form>
}

function _onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
  about: IAbout | undefined,
  setAbout: React.Dispatch<React.SetStateAction<IAbout | undefined>>
) {

  event.preventDefault()

  fetch(`${serviceHost("informator")}/api/informator/about/${about?.alias || ""}`, {
    method: about?.alias ? 'PATCH' : 'POST',
    body: new FormData(event.target as HTMLFormElement)
  })
    .then(async response => {
      if (response.ok) {
        const res = await response.json()
        setAbout(res)
        return;
      }
      // else if (response.status === 400) {
      //   // const res = await response.json()
      //   return;
      // }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
    .finally(() => setEditMode(false));
}