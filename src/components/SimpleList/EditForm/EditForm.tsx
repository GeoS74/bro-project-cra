import { useState } from "react";

import styles from "./styles.module.css"

import config from "../../../config"

type Props = {
  id: number,
  value: string,
  placeholder: string,
  setValueRow: React.Dispatch<React.SetStateAction<string | undefined>>,
  setIdActiveRow: React.Dispatch<React.SetStateAction<number>>,
  api: string,
  addRow?: (row: IRow) => void,
}

export default function EditForm({ id, setValueRow, setIdActiveRow, value, placeholder, api, addRow }: Props) {
  const [error, setError] = useState<string | undefined>(undefined);

  return <form onSubmit={(event) => { _onSubmit(event, id, api, setValueRow, setIdActiveRow, setError, addRow) }} className={styles.root}>
    <input type="text" name="title" placeholder={placeholder} defaultValue={value} autoFocus={true} />
    <input type="submit" className="btn btn-outline-primary" value="Добавить" />
    <span className="btn btn-outline-primary" onClick={() => setIdActiveRow(-1)}>Отмена</span>
    <br />
    {error ? <strong>{error}</strong> : ''}
  </form>
}

function _onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  id: number,
  api: string,
  setValueRow: React.Dispatch<React.SetStateAction<string | undefined>>,
  setIdActiveRow: React.Dispatch<React.SetStateAction<number>>,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
  addRow?: (row: IRow) => void) {

  event.preventDefault()

  fetch(`${config.catalog.back.host}:${config.catalog.back.port}${api}/${addRow ? '' : id}`, {
    method: addRow ? 'POST' : 'PATCH',
    body: new FormData(event.target as HTMLFormElement)
  })
    .then(async response => {
      if (response.ok) {
        const res = await response.json()
        setIdActiveRow(-1)
        setError(undefined)

        if (addRow) {
          addRow(res)
          return;
        }

        setValueRow(res.title)
        return;
      }
      else if (response.status === 400) {
        const res = await response.json()
        setError(res.error)
        return
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
}