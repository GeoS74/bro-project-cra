import { useState } from "react";

import EditForm from "../EditForm/EditForm"

type Props = {
  id: number, 
  title: string, 
  idActiveRow: number, 
  setIdActiveRow: React.Dispatch<React.SetStateAction<number>>
}

export default function Row({ id, title, idActiveRow, setIdActiveRow }: Props) {
  const [showOptionalButton, setShowOptionalButton] = useState(false);

  return idActiveRow === id ?
    <EditForm setIdActiveRow={setIdActiveRow} title={title}/> :
    <li
      style={{ padding: "10px" }}
      onMouseEnter={() => setShowOptionalButton(true)}
      onMouseLeave={() => setShowOptionalButton(false)}
    >
      {showOptionalButton ? <>
        {title} <span
          onClick={() => {
            setIdActiveRow(id)
          }}
        >
          Изменить
        </span> /
        <span>Удалить</span>
      </> : title}
    </li>;
}