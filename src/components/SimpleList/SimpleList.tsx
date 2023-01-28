import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import Row from "./Row/Row"

type Props = {
  [index: string]: IListConf
}

const dataList: Props = {
  brands: {
    title: "Редактирование брендов",
    placeholder: "Бренд",
    api: "/api/brands",
  },
  providers: {
    title: "Редактирование поставщиков",
    placeholder: "Поставщик",
    api: "/api/providers",
  },
}

export default function SimpleList({ typeList }: { [index: string]: keyof Props }){
  const [idActiveRow, setIdActiveRow] = useState(-1)
  const [rows, setRows] = useState(useLoaderData() as IRow[])

  return <>
    <h3>{dataList[typeList].title}</h3>

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
      .sort((a, b) => a.id - b.id)
      .map((value) => <Row
        key={value.id}
        id={value.id}
        title={value.title}
        idActiveRow={idActiveRow}
        setIdActiveRow={setIdActiveRow}
        listConf={data} />)
}
