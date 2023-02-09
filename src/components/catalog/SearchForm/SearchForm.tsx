import { useState } from "react"

import styles from "./styles.module.css"
import fetcher from "../Search/fetcher"

type Props = {
  searchResult: ISearchResult | undefined
  setSearchResult: React.Dispatch<React.SetStateAction<ISearchResult | undefined>>
  offset?: number
  limit?: number
}

export default function SearchForm({ setSearchResult, searchResult, offset, limit }: Props) {
  const [disabled, setDisabled] = useState(false)

  return <form id="searchForm" onSubmit={(event) => onSubmit(event, setDisabled, searchResult, setSearchResult, offset, limit)} className={styles.root}>
    <fieldset disabled={disabled}>
      <input type="search" name="query" className="form-control" placeholder="Поиск позиций" />
      <input type="submit" className="btn btn-outline-light" value="Поиск" />
    </fieldset>
  </form>
}

function onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  searchResult: ISearchResult | undefined,
  setSearchResult: React.Dispatch<React.SetStateAction<ISearchResult | undefined>>,
  offset?: number,
  limit?: number) {

  event.preventDefault()

  const fd = new FormData(event.target as HTMLFormElement)
  
  sessionStorage.setItem('lastQuery', fd.get('query') as string)

  setDisabled(true)
  fetcher(searchResult, setSearchResult, fd.get('query') as string, offset, limit)
    .finally(() => setDisabled(false));
}