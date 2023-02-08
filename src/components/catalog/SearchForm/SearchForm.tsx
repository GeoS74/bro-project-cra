import { useState } from "react"

import serviceHost from "../../../libs/service.host"
import styles from "./styles.module.css"

export default function SearchForm() {
  const [disabled, setDisabled] = useState(false)

  return <form onSubmit={(event) => onSubmit(event, setDisabled)} className={styles.root}>
    <fieldset disabled={disabled}>
      <input type="search" name="query" className="form-control" placeholder="Поиск позиций" />
      <input type="submit" className="btn btn-outline-light" value="Поиск" />
    </fieldset>
  </form>
}

function onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>) {

  event.preventDefault()
  setDisabled(true)

  //GET /api/bridge/search?query='text'&offset='offset'&limit='limit'
  const fd = new FormData(event.target as HTMLFormElement)

  fetch(`${serviceHost("bridge")}/api/bridge/search/?query=${fd.get('query')}`)
    .then(async response => {
      if (response.ok) {
        const res = await response.json()
        console.log(res)
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
    .finally(() => setDisabled(false));
}