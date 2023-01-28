import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import config from "../../config"
import Row from "./Row/Row"

type Props = {
  [index: string]: IListConf
}

const dataList: Props = {
  brands: {
    title: "Редактирование брендов",
    placeholderSearch: "поиск брендов",
    placeholder: "Бренд",
    api: "/api/brands",
  },
  providers: {
    title: "Редактирование поставщиков",
    placeholderSearch: "поиск поставщиков",
    placeholder: "Поставщик",
    api: "/api/providers",
  },
}

export default function SimpleList({ typeList }: { typeList: keyof Props }){
  const [idActiveRow, setIdActiveRow] = useState(-1)
  const [rows, setRows] = useState(useLoaderData() as IRow[])

  return <>
    <h3>{dataList[typeList].title}</h3>

    <form onSubmit={(event)=>_searchRow(event, dataList[typeList].api, setIdActiveRow, setRows)}>
      <input type="search" name="query" placeholder={dataList[typeList].placeholderSearch} style={{ margin: "20px 0px" }}/>
    </form>

    <br/>
    <button type="button" className="btn btn-outline-primary" onClick={() => setIdActiveRow(0)}>Новая запись</button>

    <ul>
      {idActiveRow === 0 ? <Row 
        id={idActiveRow}
        idActiveRow={idActiveRow}
        setIdActiveRow={setIdActiveRow} 
        listConf={dataList[typeList]}
        addRow={(newRow: IRow)=>setRows([newRow, ...rows])}
      /> : ""}

      {_makeList(rows, idActiveRow, setIdActiveRow, dataList[typeList])}
    </ul>
  </>
}

function _makeList(
  rows: IRow[], 
  idActiveRow: number, 
  setIdActiveRow: React.Dispatch<React.SetStateAction<number>>,
  data: IListConf) {

    return rows
      /*
      * без сортировки порядок строк может быть неожиданным,
      * особенно после редактирования строк
      */
      .sort((a, b) => b.id - a.id)
      .map((value) => <Row
        key={value.id}
        id={value.id}
        title={value.title}
        idActiveRow={idActiveRow}
        setIdActiveRow={setIdActiveRow}
        listConf={data} />)
}

function _searchRow(
  event: React.FormEvent<HTMLFormElement>, 
  api: string,
  setIdActiveRow: React.Dispatch<React.SetStateAction<number>>,
  setRows:React.Dispatch<React.SetStateAction<IRow[]>>){
  
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
