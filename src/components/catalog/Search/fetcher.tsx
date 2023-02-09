import serviceHost from "../../../libs/service.host"

export default async function fetcher(
  searchResult: ISearchResult | undefined,
  setSearchResult: React.Dispatch<React.SetStateAction<ISearchResult | undefined>>,
  query: string,
  offset?: number,
  limit?: number,
) {
  return fetch(`${serviceHost("bridge")}/api/bridge/search/?query=${query}&offset=${offset || ''}&limit=${limit || ''}`)
    .then(async response => {
      if (response.ok) {
        const res = await response.json()
        console.log(res)

        if(searchResult) {
          setSearchResult({
            ...res,
            positions: [...searchResult.positions, ...res.positions]
          })
          return;
        }
        
        setSearchResult(res)
        return;
      }
      else if ([400, 404].includes(response.status)) {
        // setSearchResult(undefined)
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
}
