import {Outlet} from "react-router-dom";
import { Link } from "react-router-dom";

export default function Main() {
  return <>
    <h1>Main page</h1>
    <ul>
      <li><Link to="/catalog">catalog page</Link></li>
      <li><Link to="/catalog/foo">not found</Link></li>
    </ul>
    <Outlet />
  </>
}