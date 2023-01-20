import React from "react";
import styles from "./styles.module.css"

export default function SearchForm() {
  return <form onSubmit={onSubmit} className={styles.root}>
      <input type="search" name="query-search" className="form-control me-sm-2" placeholder="Поиск позиций"/>
      <input type="submit" className="btn btn-outline-primary" value="Поиск"/>
  </form>
}

function onSubmit(event: React.FormEvent<HTMLFormElement>): void {
  event.preventDefault()
  console.log('search positions')
}