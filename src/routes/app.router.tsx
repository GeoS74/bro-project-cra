import {
  createBrowserRouter,
  RouterProvider,
  // redirect,
} from "react-router-dom";

import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"
import tokenManager from "../libs/token.manager"
import session from "../libs/token.manager"
import Main from "../components/Main/Main"
import catalogRouter from "./catalog.router"
import authRouter from "./auth.router"
import aboutCompanyRouter from "./about.router"
import userRouter from "./user.router"
import settingRouter from "./setting.router"
import docFlowRouter from "./docflow.router"
import userPageRoute from "./userPage.route"

const router = createBrowserRouter([
  {
    path: "/",
    // loader: () => redirect('/catalog'),
    // loader: () => session.start(),
    element: <Main />,
    loader: () => fetchWrapper(_getSlider)
      .catch(() => [])
  },
  catalogRouter,
  authRouter,
  aboutCompanyRouter,
  userRouter,
  settingRouter,
  docFlowRouter,
  userPageRoute
])

export default <RouterProvider router={router} />

async function _getSlider() {
  return fetch(`${serviceHost("mnote")}/api/mnote/search/note/?isPublic=1` )
}