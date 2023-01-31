import { Outlet } from "react-router-dom";

import Navigate from "../navigate/Navigate"

export default function Auth() {
  return <>
    <Navigate />
    <Outlet />
  </>
}