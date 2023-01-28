import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import EditForm from "../EditForm/EditForm"
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
  },
  providers: {
    title: "Редактирование поставщиков",
    placeholder: "Поставщик",
  },
}

export default function SimpleList({ typeList }: { [index: string]: keyof Props }){
  const [idActiveRow, setIdActiveRow] = useState(-1)

  return <>
    <h3>{dataList[typeList].title}</h3>

    <button type="button" className="btn btn-outline-primary" onClick={() => setIdActiveRow(0)}>Новая запись</button>

    {idActiveRow === 0 ? <EditForm setIdActiveRow={setIdActiveRow} /> : ""}

    {_makeList(useLoaderData(), idActiveRow, setIdActiveRow)}
  </>
}


function _makeList(rows: unknown, idActiveRow: number, setIdActiveRow: React.Dispatch<React.SetStateAction<number>>) {
  if (Array.isArray(rows)) {
    return rows.map((value, index) => <Row
      key={index}
      id={index + 1}
      title={value.title}
      idActiveRow={idActiveRow}
      setIdActiveRow={setIdActiveRow} />)
  }
}
