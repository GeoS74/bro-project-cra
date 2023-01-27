import { useState } from "react";
import {
  Link,
  useLoaderData,
} from "react-router-dom";

import EditForm from "../EditForm/EditForm"
import styles from "./styles.module.css"

export default function SimpleList({ type }: { [index: string]: string }) {
  const [showFormAddRow, setShowFormAddRow] = useState(false)

  const { title, placeholder } = _makeData(type)

  return <>
    <h3>{title}</h3>
    <button type="button" className="btn btn-outline-primary" onClick={() => setShowFormAddRow(true)}>Новая запись</button>
    {showFormAddRow ? <EditForm placeholder={placeholder} setShowFormAddRow={setShowFormAddRow} /> : ""}
    {_makeRows(useLoaderData())}
  </>
}

function _makeData(type: string) {
  switch (type) {
    case "brands": return {
      title: "Редактирование брендов",
      placeholder: "Бренд",
    }
    case "providers": return {
      title: "Редактирование поставщиков",
      placeholder: "Поставщик",
    }
    default: return {
      title: "Редактирование списка",
      placeholder: "Название",
    }
  }
}

function _makeRows(rows: unknown) {
  if (Array.isArray(rows)) {
    return rows.map((value, index) => <Row key={index} title={value.title} />)
  }
}

function Row({ title }: { title: string }) {
  const [showOptionalButton, setShowOptionalButton] = useState(false);
  const [showFormEditRow, setShowFormEditRow] = useState(false);

  return showFormEditRow ? 
  <EditForm placeholder="change" setShowFormAddRow={setShowFormEditRow} /> : 
  <li
    style={{ padding: "10px" }}
    onMouseEnter={() => setShowOptionalButton(true)}
    onMouseLeave={() => setShowOptionalButton(false)}>
    {showOptionalButton ? <>
    {title} <OptionalButton title="Изменить" setShowFormEditRow={setShowFormEditRow} /> / 
    <OptionalButton title="Удалить" setShowFormEditRow={setShowFormEditRow} />
    </> : title}
  </li>;
}

type OptionalButtonProps = {
  title: string,
  setShowFormEditRow: React.Dispatch<React.SetStateAction<boolean>>
}
function OptionalButton({ title, setShowFormEditRow }: OptionalButtonProps){
  return <span onClick={() => setShowFormEditRow(true)}>
    {title}
  </span>
}


