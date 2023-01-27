import styles from "./styles.module.css"

type Props = {
  title?: string,
  setIdActiveRow: React.Dispatch<React.SetStateAction<number>>
}

export default function EditForm({ setIdActiveRow, title }: Props) {
  return <form onSubmit={onSubmit} className={styles.root}>
    <input type="text" name="title" placeholder={""} defaultValue={title || ""}/>
    <input type="submit" className="btn btn-outline-primary" value="Добавить" />
    <span className="btn btn-outline-primary" onClick={() => setIdActiveRow(-1)}>Отмена</span>
  </form>
}

function onSubmit(event: React.FormEvent<HTMLFormElement>): void {
  event.preventDefault()

  // fetch('http://localhost:3500/api/search', {
  //   method: 'POST',
  //   body: new FormData(event.target as HTMLFormElement)
  // })
  // .then(async response => {
  //   if(response.ok) {
  //     const res = await response.json()
  //     console.log(res)
  //     return;
  //   }
  //   throw new Error(`response status: ${response.status}`)
  // })
  // .catch(error => console.log(error.message))
}