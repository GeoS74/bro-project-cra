import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import SearchForm from "../SimpleList/SearchForm/SearchForm"
import Row from "./Row/Row"

type SimpleListConf = {
  [index: string]: IListConf
}

const dataList: SimpleListConf = {
  brands: {
    title: "Редактирование брендов",
    placeholderSearch: "поиск брендов",
    placeholder: "Бренд",
    api: "/api/bridge/brands",
  },
  providers: {
    title: "Редактирование поставщиков",
    placeholderSearch: "поиск поставщиков",
    placeholder: "Поставщик",
    api: "/api/bridge/providers",
  },
}

export default function SimpleList({ typeList }: { typeList: keyof SimpleListConf }){
  const [idActiveRow, setIdActiveRow] = useState(-1)
  const [rows, setRows] = useState(useLoaderData() as IRow[])

  return <>
    <h3>{dataList[typeList].title}</h3>

    <SearchForm 
      api={dataList[typeList].api} 
      setIdActiveRow={setIdActiveRow} 
      setRows={setRows}
      placeholderSearch={dataList[typeList].placeholderSearch}/>

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
