import serviceHost from "../../../libs/service.host"
import styles from "./styles.module.css"

export default function SearchForm() {
  return <form onSubmit={onSubmit} className={styles.root}>
    <input type="search" name="query" placeholder="Поиск позиций" />
    <input type="submit" className="btn btn-outline-primary" value="Поиск" />
  </form>
}

function onSubmit(event: React.FormEvent<HTMLFormElement>): void {
  event.preventDefault()

  //GET /api/bridge/search?query='text'&offset='offset'&limit='limit'
  const fd = new FormData(event.target as HTMLFormElement)

  fetch(`${serviceHost("bridge")}/api/bridge/search/?query=${fd.get('query')}`)
    .then(async response => {
      if (response.ok) {
        const res = await response.json()
        console.log(res)
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
}