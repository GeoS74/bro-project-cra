import styles from "./styles.module.css"

type Props = {
  name: string,
  placeholder: string,
}

export default function EditForm({name, placeholder}: Props) {
  return <form onSubmit={onSubmit} className={styles.root}>
  <input type="text" name={name || "title"} placeholder={placeholder || ""}/>
  <input type="submit" className="btn btn-outline-primary" value="Добавить"/>
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