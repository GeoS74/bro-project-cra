import {
  createBrowserRouter,
  RouterProvider,
  // redirect,
} from "react-router-dom";

import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"
import session from "../libs/token.manager"
import Main from "../components/Main/Main"
import catalogRouter from "./catalog.router"
import authRouter from "./auth.router"
import aboutCompanyRouter from "./about.router"
import userRouter from "./user.router"
import settingRouter from "./setting.router"
import docFlowRouter from "./docflow.router"
import userPageRoute from "./userPage.route"
import newsLineRouter from "./newsLine.router"

const router = createBrowserRouter([
  {
    path: "/",
    // loader: () => redirect('/catalog'),
    // loader: () => session.start(),
    element: <Main />,
    loader: () => fetch(`${serviceHost("mnote")}/api/mnote/search/note/?isPublic=1` )
      .catch(() => [])
      .finally(() => session.start()),
  },
  catalogRouter,
  authRouter,
  aboutCompanyRouter,
  userRouter,
  settingRouter,
  docFlowRouter,
  userPageRoute,
  newsLineRouter
])

export default <RouterProvider router={router} />
