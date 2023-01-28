import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import Row from "../Row/Row"

type Props = {
  [index: string]: { 
    [index: string]: string
  }
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

  return <>
    <h3>{dataList[typeList].title}</h3>

    <button type="button" className="btn btn-outline-primary" onClick={() => setIdActiveRow(0)}>Новая запись</button>

    <ul>
      {idActiveRow === 0 ? <Row 
        id={idActiveRow}
        idActiveRow={idActiveRow}
        setIdActiveRow={setIdActiveRow} 
        data={dataList[typeList]}
      /> : ""}

      {_makeList(useLoaderData(), idActiveRow, setIdActiveRow, dataList[typeList])}
    </ul>
  </>
}


function _makeList(
  rows: unknown, 
  idActiveRow: number, 
  setIdActiveRow: React.Dispatch<React.SetStateAction<number>>,
  data: {[index: string]: string}) {
  if (Array.isArray(rows)) {
    return rows.map((value, index) => <Row
      key={index}
      id={index + 1}
      title={value.title}
      idActiveRow={idActiveRow}
      setIdActiveRow={setIdActiveRow}
      data={data} />)
  }
}
