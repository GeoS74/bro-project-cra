import { useState } from "react";

import tokenManager from "../../../classes/TokenManager"
import serviceHost from "../../../libs/service.host"
import fetchWrapper from "../../../libs/fetch.wrapper"
import styles from "./styles.module.css"

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
  const [disabled, setDisabled] = useState(false)

  return <form
    onSubmit={(event) => { _onSubmit(event, id, api, setValueRow, setIdActiveRow, setError, setDisabled, addRow) }}
    className={styles.root}>

    <fieldset disabled={disabled}>
      <input type="text" name="title" className="form-control" placeholder={placeholder} defaultValue={value} autoFocus={true} />

      <input type="submit" className="btn btn-outline-light" value="Добавить" />

      <span className="btn btn-outline-light" onClick={() => setIdActiveRow(-1)}>Отмена</span>

      {error ? <strong>{error}</strong> : ''}
    </fieldset>
  </form>
}

function _onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  id: number,
  api: string,
  setValueRow: React.Dispatch<React.SetStateAction<string | undefined>>,
  setIdActiveRow: React.Dispatch<React.SetStateAction<number>>,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  addRow?: (row: IRow) => void) {

  event.preventDefault()
  setDisabled(true)

  fetchWrapper(() => fetch(`${serviceHost("bridge")}${api}/${addRow ? '' : id}`, {
    method: addRow ? 'POST' : 'PATCH',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: new FormData(event.target as HTMLFormElement)
  }))
    .then(response => {
      if (Array.isArray(response)) {
        throw new Error(`error edit row`)
      }
      return response;
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
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
    .finally(() => setDisabled(false));
}
