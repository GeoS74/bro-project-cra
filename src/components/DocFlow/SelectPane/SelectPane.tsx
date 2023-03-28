import { useState } from "react"
import session from "../../../libs/token.manager"

export default function SelectPane() {
  const [directing, setDirecting] = useState<IDirecting>()

  return <>
    <select name="directingId" className="form-select btn-outline-light mt-2" defaultValue={''}
      onChange={(event) => _selectDirecting(event, setDirecting)}
    >
      <option value="">Выберите направление</option>
      {_mekeOptions(session.getMe()?.roles[0].directings as IRow[])}
    </select>

    <select name="taskId" className="form-select btn-outline-light mt-2" defaultValue={''}>
      <option value="">Выберите тип документа</option>
      {_mekeOptions(directing?.tasks)}
    </select>
  </>
}

function _selectDirecting(
  event: React.ChangeEvent<HTMLSelectElement>,
  setDirecting: React.Dispatch<React.SetStateAction<IDirecting | undefined>>
) {
  const current = event.currentTarget.value
  const directing = session.getMe()?.roles[0].directings.find(e => e.id.toString() === current)
  setDirecting(directing)
}

function _mekeOptions(rows?: IRow[]) {
  if (rows) {
    return rows.map((row, index) => (<
      option value={row.id} key={index}>{row.title}</option>
    ))
  }
}