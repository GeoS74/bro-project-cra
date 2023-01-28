import styles from "./styles.module.css"

import config from "../../../config"

type Props = {
  value: string,
  placeholder: string,
  setIdActiveRow: React.Dispatch<React.SetStateAction<number>>,
  api: string,
}

export default function EditForm({ setIdActiveRow, value, placeholder, api }: Props) {
  return <form onSubmit={(event) => {onSubmit(event, api, setIdActiveRow)}} className={styles.root}>
    <input type="text" name="title" placeholder={placeholder} defaultValue={value}/>
    <input type="submit" className="btn btn-outline-primary" value="Добавить" />
    <span className="btn btn-outline-primary" onClick={() => setIdActiveRow(-1)}>Отмена</span>
  </form>
}

function onSubmit(
  event: React.FormEvent<HTMLFormElement>, 
  api: string, 
  setIdActiveRow: React.Dispatch<React.SetStateAction<number>>) {

  event.preventDefault()

  fetch(`${config.catalog.back.host}:${config.catalog.back.port}${api}`, {
    method: 'POST',
    body: new FormData(event.target as HTMLFormElement)
  })
  .then(async response => {
    if(response.ok) {
      const res = await response.json()
      console.log(res)
      return;
    }
    throw new Error(`response status: ${response.status}`)
  })
  .catch(error => console.log(error.message))
  .finally(() => setIdActiveRow(-1))
}