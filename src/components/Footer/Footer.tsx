import { Link } from "react-router-dom"
import styles from "./styles.module.css"


export default function Main() {
  return <div className={styles.root}>
      <div>
        <ul>
          <li><Link to="/about">О компании</Link></li>
          <li>Контакты</li>
          <li>Условия гарантии</li>
        </ul>
      </div>
      <div>
        <p>Тел.: +7 (951) 445-67-20</p>
        <p>email: info@sgn74.ru</p>
        <p>Челябинская область, г. Челябинск, Копейское шоссе, д. 48 помещение 1</p>
      </div>
  </div>
}