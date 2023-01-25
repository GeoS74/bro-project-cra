import {
  Outlet,
  Link,
} from "react-router-dom";

import Navigate from "../navigate/Navigate"

export default function Catalog() {
  return <>
    <Navigate />
    <h1>Каталог</h1>
    <Outlet />
  </>
}