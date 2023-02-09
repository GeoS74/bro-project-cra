import { useState } from "react"

import fetcher from "../Search/fetcher"

type Props = {
  searchResult: ISearchResult | undefined
  setSearchResult: React.Dispatch<React.SetStateAction<ISearchResult | undefined>>
  offset?: number
  limit?: number
}

export default function NextSearch({ setSearchResult, searchResult, offset, limit }: Props) {
  const [hidden, setHidden] = useState(false)

  return searchResult?.positions.length ?
    <button
      hidden={hidden}
      onClick={() => onSubmit(setHidden, searchResult, setSearchResult, searchResult.offset, searchResult.limit)}
      type="button" className="btn btn-outline-light mt-4">Загрузить ещё</button>
    : <></>
}

async function onSubmit(
  setHidden: React.Dispatch<React.SetStateAction<boolean>>,
  searchResult: ISearchResult | undefined,
  setSearchResult: React.Dispatch<React.SetStateAction<ISearchResult | undefined>>,
  offset?: number,
  limit?: number) {

  const query = sessionStorage.getItem('lastQuery') || "";
  offset = offset || 0
  limit = limit || 10

  setHidden(true)
  const result = await fetcher(query, offset + limit, limit)
    .finally(() => setHidden(false));


  /* start here */
  if (!result) {
    setHidden(true)
    return;
  }
  

  if (searchResult?.positions && result) {
    setSearchResult({
      ...result,
      positions: [...searchResult.positions, ...result.positions]
    })
    return;
  }

  setSearchResult(result)
}
