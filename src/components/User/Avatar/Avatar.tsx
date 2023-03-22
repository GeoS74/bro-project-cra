import { useState } from "react"

import serviceHost from "../../../libs/service.host"
import fetchWrapper from "../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../middleware/response.validator"
import tokenManager from "../../../libs/token.manager"
import styles from "./styles.module.css"
import person from "./image/person.svg"

type Props = {
  userPhoto?: string,
}

export default function Avatar({ userPhoto }: Props) {
  const [photo, setPhoto] = useState(userPhoto)

  return <form className={styles.root} onChange={event => _changePhoto(event, setPhoto)}>
    <img src={_getAvatar(photo)} loading="lazy" onClick={_fileSelection} />

    <input type="file" accept="image/*" name="photo" hidden />
  </form>
}

function _changePhoto(
  event: React.FormEvent<HTMLFormElement>,
  setPhoto: React.Dispatch<React.SetStateAction<string | undefined>>
) {

  /* BUG detected
  если access токен будет просрочен, то после refresh-a фото не будет изменено при таком вызове
    fetchWrapper(() => fetch(`${serviceHost("informator")}/api/informator/user/photo`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${tokenManager.getAccess()}`
      },
      body: new FormData(event.currentTarget)
    }))

  для исправления надо FormData записывать в константу перед вызовом fetchWrapper
  PS возможно это как-то связано с тем, что используется событие onChange, а не onSubmit
  */
  const fd = new FormData(event.currentTarget)

  fetchWrapper(() => fetch(`${serviceHost("informator")}/api/informator/user/photo`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  }))
    .then(responseNotIsArray)
    .then(async (response) => {
      if (response.ok) {
        const res = await response.json()
        setPhoto(res.photo)
        return;
      }

      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
}

function _getAvatar(photo: string | undefined) {
  return !photo ? person : `${serviceHost('informator')}/api/informator/user/photo/${photo}`;
}

function _fileSelection(event: React.MouseEvent<HTMLImageElement, MouseEvent>) {
  (event.currentTarget.nextElementSibling as HTMLInputElement).click()
}