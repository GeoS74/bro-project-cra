import { useState } from "react";

import EditForm from "../EditForm/EditForm"

type Props = {
  id: number, 
  idActiveRow: number, 
  setIdActiveRow: React.Dispatch<React.SetStateAction<number>>,
  data: IListConf,
  title?: string,
  addRow?: (row: IRow) => void
}

export default function Row({ id, title, idActiveRow, setIdActiveRow, data, addRow }: Props) {
  const [valueRow, setValueRow] = useState(title)
  const [showOptionalButton, setShowOptionalButton] = useState(false);

  return idActiveRow === id ?
    <EditForm 
      id={id}
      setValueRow={setValueRow}
      setIdActiveRow={setIdActiveRow} 
      addRow={addRow}
      value={valueRow || ""}
      placeholder={data.placeholder || ""}
      api={data.api}
    /> :
    <li
      style={{ padding: "10px" }}
      onMouseEnter={() => setShowOptionalButton(true)}
      onMouseLeave={() => setShowOptionalButton(false)}
    >
      {showOptionalButton ? <>
        {valueRow} <span onClick={() => setIdActiveRow(id)}>Изменить</span> 
        /
        <span>Удалить</span>
      </> : valueRow}
    </li>;
}