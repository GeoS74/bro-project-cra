import { useState } from "react"

import fetcher from "../Search/fetcher"

type Props = {
  hiddenNextSearch: boolean
  setHiddenNextSearch: React.Dispatch<React.SetStateAction<boolean>>
  searchResult: ISearchResult | undefined
  setSearchResult: React.Dispatch<React.SetStateAction<ISearchResult | undefined>>
}

export default function NextSearch({hiddenNextSearch, setHiddenNextSearch, setSearchResult, searchResult}: Props) {
  return searchResult?.positions.length ?
    <button
      hidden={hiddenNextSearch}
      onClick={() => onSubmit(setHiddenNextSearch, searchResult, setSearchResult, searchResult.offset, searchResult.limit)}
      type="button" className="btn btn-outline-light mt-4">Загрузить ещё</button>
    : <></>
}

async function onSubmit(
  setHiddenNextSearch: React.Dispatch<React.SetStateAction<boolean>>,
  searchResult: ISearchResult | undefined,
  setSearchResult: React.Dispatch<React.SetStateAction<ISearchResult | undefined>>,
  offset: number,
  limit: number) {

  const query = sessionStorage.getItem('lastQuery') || "";

  setHiddenNextSearch(true)
  const result = await fetcher(query, offset + limit, limit)
    .finally(() => setHiddenNextSearch(false));

  if (!result) {
    setHiddenNextSearch(true)
    return;
  }

  if (searchResult) {
    setSearchResult({
      ...result,
      positions: [...searchResult.positions, ...result.positions]
    })
    return;
  }

  setSearchResult(result)
}
