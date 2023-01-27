import { useState } from "react";
import {
  Link,
  useLoaderData,
} from "react-router-dom";

import EditForm from "../EditForm/EditForm"
import styles from "./styles.module.css"

const dataList: {
  [index: string]: {
    title: string,
    placeholder?: string
  }
} = {
  brands: {
    title: "Редактирование брендов",
    placeholder: "Бренд",
  },
  providers: {
    title: "Редактирование поставщиков",
    placeholder: "Поставщик",
  },
}

export default function SimpleList({ typeList }: { [index: string]: keyof typeof dataList }) {
  const [showForm, setShowForm] = useState(false)
  
  return <>
    <h3>{dataList[typeList].title}</h3>
    <button type="button" className="btn btn-outline-primary" onClick={() => setShowForm(true)}>Новая запись</button>
    {showForm ? <EditForm
      setShowForm={setShowForm} /> : ""}
    {_makeList(useLoaderData(), setShowForm)}
  </>
}

function _makeList(rows: unknown, setShowFormAddRow: React.Dispatch<React.SetStateAction<boolean>>) {
  if (Array.isArray(rows)) {
    return rows.map((value, index) => <Row key={index} title={value.title} setShowFormAddRow={setShowFormAddRow}/>)
  }
}

function Row({ title, setShowFormAddRow }: { title: string, setShowFormAddRow: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [showOptionalButton, setShowOptionalButton] = useState(false);
  const [showFormEditRow, setShowFormEditRow] = useState(false);

  return showFormEditRow ?
    <EditForm setShowForm={setShowFormEditRow} /> :
    <li
      style={{ padding: "10px" }}
      onMouseEnter={() => setShowOptionalButton(true)}
      onMouseLeave={() => setShowOptionalButton(false)}
      >
      {showOptionalButton ? <>
        {title} <span
          onClick={()=>{
            setShowFormAddRow(false)
            setShowFormEditRow(true)}}
        >
          Изменить
          </span> /
        <OptionalButton title="Удалить" setShowFormEditRow={setShowFormEditRow} />
      </> : title}
    </li>;
}

type OptionalButtonProps = {
  title: string,
  setShowFormEditRow: React.Dispatch<React.SetStateAction<boolean>>
}
function OptionalButton({ title, setShowFormEditRow }: OptionalButtonProps) {
  return <span onClick={() => setShowFormEditRow(true)}>
    {title}
  </span>
}


