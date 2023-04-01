import { useState } from "react"

import session from "../../../../libs/token.manager"
import finder from "../../../../libs/deep.finder"
import { ErrorMessage } from "../ErrorMessage/ErrorMessage"
import classNames from "classnames"
import styles from "./styles.module.css"

type Props = {
  mode: string
  errorMessage: IErrorDocMessage | undefined
}

export default function SelectPane({ mode, errorMessage }: Props) {
  const [directing, setDirecting] = useState<IDirecting>()

  return <div className={classNames(styles.root, "mb-4")}>

    <div className="form-group">
      <label htmlFor="directSelect" className="form-label mt-4">Направление:</label>
      <select name="directingId" className="form-select btn-outline-light mt-2" defaultValue={""} id="directSelect"
        onChange={(event) => _selectDirecting(event, setDirecting)}
      >
        <option value="">Выберите направление</option>
        {_mekeOptions(mode, session.getMe()?.roles[0].directings as IRow[])}
      </select>

      {errorMessage?.field === "directSelect" ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
    </div>

    <div className="form-group">
      <label htmlFor="taskSelect" className="form-label mt-4">Тип документа:</label>
      <select name="taskId" className="form-select btn-outline-light mt-2" defaultValue={""} id="taskSelect">
        <option value="">Выберите тип документа</option>
        {_mekeOptions(mode, directing?.tasks)}
      </select>

      {errorMessage?.field === "taskSelect" ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
    </div>

  </div>
}

function _selectDirecting(
  event: React.ChangeEvent<HTMLSelectElement>,
  setDirecting: React.Dispatch<React.SetStateAction<IDirecting | undefined>>
) {
  const current = event.currentTarget.value
  const directing = session.getMe()?.roles[0].directings.find(e => e.id.toString() === current)
  setDirecting(directing)
}

function _mekeOptions(mode: string, rows?: IRow[]) {
  if (rows) {
    return rows.map((row, index) => {
      if (finder(row, mode === 'create' ? 'Создать' : 'Редактировать')) {
        return <option value={row.id} key={index}>{row.title}</option>
      }
    })
  }
}