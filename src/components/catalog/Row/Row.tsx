import { useState } from "react";

import EditForm from "../EditForm/EditForm"

type Props = {
  id: number, 
  idActiveRow: number, 
  setIdActiveRow: React.Dispatch<React.SetStateAction<number>>,
  title?: string,
  data: {[index: string]: string}
}

export default function Row({ id, title, idActiveRow, setIdActiveRow, data }: Props) {
  const [showOptionalButton, setShowOptionalButton] = useState(false);

  return idActiveRow === id ?
    <EditForm 
      setIdActiveRow={setIdActiveRow} 
      value={title || ""}
      placeholder={data.placeholder || ""}
      api={data.api}
    /> :
    <li
      style={{ padding: "10px" }}
      onMouseEnter={() => setShowOptionalButton(true)}
      onMouseLeave={() => setShowOptionalButton(false)}
    >
      {showOptionalButton ? <>
        {title} <span onClick={() => setIdActiveRow(id)}>Изменить</span> 
        /
        <span>Удалить</span>
      </> : title}
    </li>;
}