import { Link } from "react-router-dom"
import styles from "./styles.module.css"


export default function Main() {
  return <div className={styles.root}>
    <div>
      <ul>
      <li><Link to="/about/contact">Контакты</Link></li>
        <li><Link to="/about/company">О компании</Link></li>
        <li><Link to="/about/credential">Реквизиты</Link></li>
        <li><Link to="/about/garanty">Условия гарантии</Link></li>
      </ul>
    </div>
    <div>
      <p>Тел.: +7 (951) 445-67-20</p>
      <p>email: info@sgn74.ru</p>
      <p>г. Челябинск, Копейское шоссе, д. 48 помещение 1</p>
    </div>
  </div>
}