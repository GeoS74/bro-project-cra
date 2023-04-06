import { Link } from "react-router-dom";
import session from "../../libs/token.manager"

import Greet from "./Greet/Greet";
import styles from "./styles.module.css"
import classNames from "classnames";
import logo from "./image/logo.svg"

function _toggleMenu(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  event.currentTarget.classList.toggle('collapsed')
  event.currentTarget.nextElementSibling?.classList.toggle('show');
}

export default function Navigate() {
  session.subscribe('navigate')

  return <div className={styles.root}>
    <div>
    <nav className={classNames("navbar navbar-expand-lg navbar-dark bg-primary")}>
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Redial Trade</Link>

      <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01"
        aria-expanded="true" aria-label="Toggle navigation"
        onClick={_toggleMenu}>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav me-auto">
          {/* <li className="nav-item">
            <Link to="/" className="nav-link active">Home</Link>
          </li> */}

          <li className="nav-item">
            <Link to="/catalog" className="nav-link active"> Каталог</Link>
          </li>




          <li className="nav-item">
            <Link to="/about" className="nav-link">О компании</Link>
          </li>


          {session.getMe() ? <li className="nav-item">
            <Link to="/user" className="nav-link">Кабинет</Link>
          </li>
            : <></>}

          {session.getMe()?.rank === 'admin' ?
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" onClick={(event) => event.currentTarget.nextElementSibling?.classList.toggle("show")}>Прайс</span>
              <div className="dropdown-menu" onClick={(event) => event.currentTarget.classList.toggle("show")}>
                <Link to="/catalog/edit/brands" className="dropdown-item">Бренды</Link>
                <Link to="/catalog/edit/providers" className="dropdown-item">Поставщики</Link>
                <hr />
                <Link to="/catalog/edit/upload" className="dropdown-item">Загрузка прайса</Link>
              </div>
            </li>
            : <></>}
        </ul>
      </div>
    </div>
  </nav>
    </div>
  <Greet />
  </div>
}