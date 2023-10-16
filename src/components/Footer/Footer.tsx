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
        <li>Тел.: +7 (351) 777-67-49</li>
        <li>Факс: +7 (351) 259-39-56</li>
        <li>email: redial-trade@yandex.ru</li>
        <li>г. Челябинск, ул. Енисейская, 12</li>
      </ul>
    </div>
  </div>
}