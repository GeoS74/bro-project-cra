import styles from "./styles.module.css"
import classNames from "classnames";

type Props = {
  products: IProduct[] | undefined
}

export default function SearchPane({ products }: Props) {
  return products?.length ?

    <div className={styles.root}>

      <header className="border-light mt-4">
        <div>Наименование, артикул</div>
        <div></div>
        <div>Производитель</div>
        <div>Остаток</div>
        <div>Цена</div>
        <div></div>
      </header>

      {_makeList(products)}

    </div> : <div className={styles.root}>товары не найдены</div>
}

function _makeList(products: IProduct[]) {
  return products
    .map((p, index) => <div key={index} className={classNames(styles.makelist, "card mt-2")}>
      <div>
        <p>{p.title}</p>
        <p>{p.article}</p>
      </div>
      <div></div>
      <div>{p.manufacturer}</div>
      <div>{p.amount || "под заказ"}</div>
      <div>{p.price || <small>Уточняйте у менеджера</small>}</div>
      <div></div>
    </div>)
}