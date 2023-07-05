import { Link } from "react-router-dom"
import styles from "./styles.module.css"


export default function Main() {
  return <div className={styles.root}>
    <div>
      <h5>Страницы сайта:</h5>
      <ul>
        <li><Link to="/about/contact">Контакты</Link></li>
        <li><Link to="/about/company">О компании</Link></li>
        <li><Link to="/about/credential">Реквизиты</Link></li>
        <li><Link to="/about/garanty">Условия гарантии</Link></li>
      </ul>
    </div>
    <div>
      <h5>Контакты:</h5>
      <ul>
        <li>Тел.: +7 (351) 751-29-31</li>
        <li>email: info@sgn74.ru</li>
        <li>г. Челябинск, Копейское шоссе, д. 48 помещение 1</li>
      </ul>
    </div>
  </div>
}