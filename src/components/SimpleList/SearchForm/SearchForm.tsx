import config from "../../../config"

type Props = {
  api: string,
  setIdActiveRow: React.Dispatch<React.SetStateAction<number>>,
  setRows: React.Dispatch<React.SetStateAction<IRow[]>>,
  placeholderSearch?: string,
}

export default function SearchForm({api, setIdActiveRow, setRows, placeholderSearch}: Props) {
  return <form onSubmit={(event)=>_searchRow(event, api, setIdActiveRow, setRows)}>
    <input type="search" name="query" placeholder={placeholderSearch || ""} style={{ margin: "20px 0px" }}/>
  </form>
}

function _searchRow(
  event: React.FormEvent<HTMLFormElement>,
  api: string,
  setIdActiveRow: React.Dispatch<React.SetStateAction<number>>,
  setRows: React.Dispatch<React.SetStateAction<IRow[]>>){
  
    event.preventDefault()

    const fd = new FormData(event.target as HTMLFormElement)

    fetch(`${config.catalog.back.host}:${config.catalog.back.port}${api}/?title=${fd.get('query')}`)
    .then(async response => {
      if(response.ok) {
        const res = await response.json()
        setIdActiveRow(-1)
        setRows(res)
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
}