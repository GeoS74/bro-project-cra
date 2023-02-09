import { useState } from "react";

import SearchForm from "../SearchForm/SearchForm";
import SearchPane from "../SearchPane/SearchPane"
import styles from "./styles.module.css"

export default function Search() {
  const [products, setProducts] = useState<IProduct[]>([])

  return <div className={styles.root}>
    <h3>Поиск позиций</h3>
    <SearchForm setProducts={setProducts} />

    <SearchPane products={products} />

  </div>
}