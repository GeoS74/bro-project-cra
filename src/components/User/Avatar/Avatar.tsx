import { useState } from "react"

import serviceHost from "../../../libs/service.host"
import fetchWrapper from "../../../libs/fetch.wrapper"
import tokenManager from "../../../classes/TokenManager"
import styles from "./styles.module.css"

import person from "./image/person.svg"

type Props = {
  userPhoto?: string,
}

export default function Avatar({ userPhoto }: Props) {
  const [photo, setPhoto] = useState(userPhoto)

  return <>
    <img src={_getAvatar(photo)} className={styles.root} loading="lazy"
      onClick={_fileSelection} />

    <form onChange={event => _changePhoto(event, setPhoto)} hidden>
      <input type="file" accept="image/*" name="photo" />
    </form>
  </>
}

function _changePhoto(
  event: React.FormEvent<HTMLFormElement>,
  setPhoto: React.Dispatch<React.SetStateAction<string | undefined>>
) {

  fetchWrapper(() => fetch(`${serviceHost("informator")}/api/informator/user/photo`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: new FormData(event.currentTarget)
  }))
    .then(response => {
      if (Array.isArray(response)) {
        throw new Error(`error change avatar`)
      }
      return response;
    })
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
  (event.currentTarget.nextElementSibling?.querySelector('input') as HTMLInputElement).click()
}