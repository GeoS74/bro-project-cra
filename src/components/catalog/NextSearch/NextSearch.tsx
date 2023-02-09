import { useState } from "react"

import fetcher from "../Search/fetcher"

type Props = {
  searchResult: ISearchResult | undefined
  setSearchResult: React.Dispatch<React.SetStateAction<ISearchResult | undefined>>
  offset?: number
  limit?: number
}

export default function NextSearch({ setSearchResult, searchResult, offset, limit }: Props) {
  const [disabled, setDisabled] = useState(false)

  return searchResult?.positions.length ?
    <button
      onClick={() => onSubmit(setDisabled, searchResult, setSearchResult, offset, limit)}
      type="button" className="btn btn-outline-light mt-4">Загрузить ещё</button>
    : <></>
}

function onSubmit(
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  searchResult: ISearchResult | undefined,
  setSearchResult: React.Dispatch<React.SetStateAction<ISearchResult | undefined>>,
  offset?: number,
  limit?: number) {

  const query = sessionStorage.getItem('lastQuery') || "";
  offset = offset || 0
  limit = limit || 0

  setDisabled(true)
  fetcher(searchResult, setSearchResult, query, offset+limit, limit)
    .finally(() => setDisabled(false));
}
