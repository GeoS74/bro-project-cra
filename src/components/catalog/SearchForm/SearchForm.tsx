import React from "react";
import styles from "./styles.module.css"

export default function SearchForm() {
  return <form onSubmit={onSubmit} className={styles.root}>
    <input type="search" name="query" placeholder="Поиск позиций" />
    <input type="submit" className="btn btn-outline-primary" value="Поиск" />
  </form>
}

function onSubmit(event: React.FormEvent<HTMLFormElement>): void {
  event.preventDefault()

  fetch('http://localhost:3500/api/search', {
    method: 'POST',
    body: new FormData(event.target as HTMLFormElement)
  })
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