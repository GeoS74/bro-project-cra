import { useState } from "react";

import config from "../../../config"
import EditForm from "../EditForm/EditForm"
import styles from "./styles.module.css"

type Props = {
  id: number,
  idActiveRow: number,
  setIdActiveRow: React.Dispatch<React.SetStateAction<number>>,
  listConf: IListConf,
  title?: string,
  addRow?: (row: IRow) => void
}

export default function Row({ id, title, idActiveRow, setIdActiveRow, listConf, addRow }: Props) {
  const [valueRow, setValueRow] = useState(title);
  const [showOptionalButton, setShowOptionalButton] = useState(false);
  const [visible, setVisible] = useState(true);

  if (idActiveRow === id) {
    return <EditForm
      id={id}
      setValueRow={setValueRow}
      setIdActiveRow={setIdActiveRow}
      addRow={addRow}
      value={valueRow || ""}
      placeholder={listConf.placeholder || ""}
      api={listConf.api}
    />
  }

  if (visible) {
    return <li
      className={styles.li}
      onMouseEnter={() => setShowOptionalButton(true)}
      onMouseLeave={() => setShowOptionalButton(false)}
    >
      {showOptionalButton ? <>
        {valueRow}
        <span className="text-muted" onClick={() => setIdActiveRow(id)}>Изменить</span>
        /
        <span className="text-muted"
          onClick={() => {
            if (!confirm('Delete this row?')) return;
            setVisible(false)
            _deleteRow(id, listConf.api);
          }} >Удалить</span>
      </> : valueRow}
    </li>
  }

  return <></>;
}

function _deleteRow(id: number, api: string) {
  return fetch(`${config.catalog.back.host}${config.catalog.back.port ? ':' : ''}${config.catalog.back.port}${api}/${id}`, {
    method: 'DELETE'
  })
    .then(async response => {
      if (response.ok) {
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
}