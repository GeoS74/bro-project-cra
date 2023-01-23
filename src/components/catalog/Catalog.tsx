import {Outlet} from "react-router-dom";
import { Link } from "react-router-dom";
import './lux-thema.css'

import SearchForm from './components/SearchForm'

export default function Catalog() {
  return <>
    <h1>Catalog page</h1>
    <Link to="/">go home page</Link>
    <SearchForm />
    <Outlet />
  </>
}