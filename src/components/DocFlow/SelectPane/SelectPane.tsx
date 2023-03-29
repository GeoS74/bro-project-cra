import classNames from "classnames"
import { useState } from "react"
import session from "../../../libs/token.manager"
import finder from "../../../libs/deep.finder"

import styles from "./styles.module.css"

type Props = {
  mode: string
}

export default function SelectPane({ mode }: Props) {
  const [directing, setDirecting] = useState<IDirecting>()

  return <fieldset className={classNames(styles.root, "mb-4")}>
    <select name="directingId" className="form-select btn-outline-light mt-2" defaultValue={''}
      onChange={(event) => _selectDirecting(event, setDirecting)}
    >
      <option value="">Выберите направление</option>
      {_mekeOptions(mode, session.getMe()?.roles[0].directings as IRow[])}
    </select>

    <select name="taskId" className="form-select btn-outline-light mt-2" defaultValue={''}>
      <option value="">Выберите тип документа</option>
      {_mekeOptions(mode, directing?.tasks)}
    </select>
  </fieldset>
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