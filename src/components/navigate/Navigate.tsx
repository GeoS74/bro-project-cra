import { Link } from "react-router-dom";

export default function Navigate() {
  return <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Marketplace</Link>
      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link active">Home</Link>
          </li>
          <li className="nav-item">
          <Link to="/catalog/edit/upload" className="nav-link">Загрузка прайса</Link>
          </li>
          <li className="nav-item">
          <Link to="/catalog/edit/brands" className="nav-link">Бренды</Link>
          </li>
          <li className="nav-item">
          <Link to="/catalog/edit/providers" className="nav-link">Поставщики</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
}