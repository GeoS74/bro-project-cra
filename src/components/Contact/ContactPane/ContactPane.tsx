import { Link } from "react-router-dom"
import styles from "./styles.module.css"



type Props = {
  contacts: IContact[]
}

export default function SearchPane({ contacts }: Props) {
  return contacts?.length ?

    <div className={styles.root}>

      <header className="border-light mt-4">
        <div>Организация</div>
        <div>Сайт</div>
        <div>email</div>
        <div>Тел.</div>
        <div>Контакт</div>
        <div>Продукция</div>
      </header>

      {_makeList(contacts)}

    </div> : <div>товары не найдены</div>
}

function _makeList(contacts: IContact[]) {
  return contacts
    .map((p, index) => <div key={index} className="card mt-0">
        <div>
          <p><Link to={`/contacts/page/${p.id}`}>{p.title}</Link></p>
          <pre>{p.info}</pre>
        </div>
        <div>{p.site ? <a href={p.site} target="_blank" rel="noreferrer">{p.site}</a>: ''}</div>
        <div>{p.email}</div>
        <div>{p.phone}</div>
        <div>{p.name}</div>
        <div>{p.products}</div>
    </div>)
}