import { useState } from "react"

import tokenManager from "../../../libs/token.manager"
import serviceHost from "../../../libs/service.host"
import fetchWrapper from "../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../middleware/response.validator"
import styles from "./styles.module.css"

type Props = {
  // setHiddenNextSearch: React.Dispatch<React.SetStateAction<boolean>>
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
  setDocs: React.Dispatch<React.SetStateAction<IDoc[]>>
  limit: number
  last?: number
}

export default function SearchForm({/*etHiddenNextSearch, */setShowForm, setDocs, last, limit }: Props) {
  const [disabled, setDisabled] = useState(false)

  return <form id="searchForm" className={styles.root}
    onSubmit={(event) => {
      // setHiddenNextSearch(false)
      onSubmit(event, setDisabled, setDocs, setShowForm, limit, last)
    }}>
    
    <fieldset disabled={disabled}>
      <input type="search" name="query" className="form-control" placeholder="Введите название документа" />
      <input type="submit" className="btn btn-outline-light" value="Поиск" />
    </fieldset>
  </form>
}

async function onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setDocs: React.Dispatch<React.SetStateAction<IDoc[]>>,
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>,
  limit: number,
  last?: number
  ) {

  event.preventDefault()

  const fd = new FormData(event.target as HTMLFormElement)

  sessionStorage.setItem('lastQuery', fd.get('query') as string)

  setDisabled(true)
  setShowForm(false)

  const url = fd.get('query') ? `/api/informator/docflow/search/doc/?title=${fd.get('query')}&limit=${limit}&last=` 
  : `/api/informator/docflow`

  fetchWrapper(() => fetch(`${serviceHost('informator')}${url}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.json()
        setDocs(res)
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
    .finally(() => setDisabled(false));

}