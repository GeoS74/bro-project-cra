import { useState } from "react";

import SearchForm from "../SearchForm/SearchForm";
import SearchPane from "../SearchPane/SearchPane"
import NextSearch from "../NextSearch/NextSearch"
import styles from "./styles.module.css"

export default function Search() {
  const [searchResult, setSearchResult] = useState<ISearchResult>()

  return <div className={styles.root}>
    <h3>Поиск позиций</h3>

    <SearchForm
      offset={0}
      limit={10}
      searchResult={searchResult}
      setSearchResult={setSearchResult} />

    <SearchPane products={searchResult?.positions} />

    <NextSearch
      offset={searchResult?.offset}
      limit={searchResult?.limit}
      searchResult={searchResult}
      setSearchResult={setSearchResult} />
  </div>
}
