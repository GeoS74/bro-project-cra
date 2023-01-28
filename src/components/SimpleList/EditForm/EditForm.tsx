import styles from "./styles.module.css"

import config from "../../../config"

type Props = {
  value: string,
  placeholder: string,
  setValueRow: React.Dispatch<React.SetStateAction<string | undefined>>,
  setIdActiveRow: React.Dispatch<React.SetStateAction<number>>,
  api: string,
  addRow?: (row: IRow) => void,
}

export default function EditForm({ setValueRow, setIdActiveRow, value, placeholder, api, addRow }: Props) {
  return <form onSubmit={(event) => {onSubmit(event, api, setValueRow, setIdActiveRow, addRow)}} className={styles.root}>
    <input type="text" name="title" placeholder={placeholder} defaultValue={value}/>
    <input type="submit" className="btn btn-outline-primary" value="Добавить" />
    <span className="btn btn-outline-primary" onClick={() => setIdActiveRow(-1)}>Отмена</span>
  </form>
}

function onSubmit(
  event: React.FormEvent<HTMLFormElement>, 
  api: string, 
  setValueRow: React.Dispatch<React.SetStateAction<string | undefined>>,
  setIdActiveRow: React.Dispatch<React.SetStateAction<number>>,
  addRow?: (row: IRow) => void) {

  event.preventDefault()

  fetch(`${config.catalog.back.host}:${config.catalog.back.port}${api}`, {
    method: 'POST',
    body: new FormData(event.target as HTMLFormElement)
  })
  .then(async response => {
    if(response.ok) {
      const res = await response.json()
      // console.log(res)
      setValueRow(res.title)
      if(addRow){
        addRow(res)
      }
      return;
    }
    throw new Error(`response status: ${response.status}`)
  })
  .catch(error => console.log(error.message))
  .finally(() => setIdActiveRow(-1))
}