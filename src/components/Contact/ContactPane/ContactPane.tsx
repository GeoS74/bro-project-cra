import { Link } from "react-router-dom"
import styles from "./styles.module.css"



type Props = {
  contacts: IContact[]
}

export default function SearchPane({ contacts }: Props) {
  return contacts?.length ?

    <div className={styles.root}>

      <header className="border-light mt-4">
        <div>Наименование</div>
        <div>Продукция</div>
        <div>Сайт</div>
        <div>email</div>
        <div>Контакт</div>
        <div></div>
      </header>

      {_makeList(contacts)}

    </div> : <div>товары не найдены</div>
}

function _makeList(contacts: IContact[]) {
  return contacts
    .map((p, index) => <div key={index} className="card mt-0">
      <div>
        <Link to={`/contacts/${p.id}`}><p>{p.title}</p></Link>
        {/* <p>{p.article}</p> */}
      </div>
      <div></div>
      {/* <div>{p.manufacturer}</div>
      <div>{+p.amount || "под заказ"}</div>
      <div>{+p.price || <small>Уточняйте у менеджера</small>}</div> */}
      <div></div>
    </div>)
}