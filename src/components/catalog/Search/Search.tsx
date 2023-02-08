import SearchForm from "../SearchForm/SearchForm";
import styles from "./styles.module.css"

export default function Search() {
  return <div className={styles.root}>
    <h3>Поиск позиций</h3>
    <SearchForm />
  </div>
}