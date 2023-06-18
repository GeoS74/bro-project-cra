import {
  createBrowserRouter,
  RouterProvider,
  // redirect,
} from "react-router-dom";

import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"
import session from "../libs/token.manager"
import tokenManager from "../libs/token.manager"
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
    // loader: () => fetch(`${serviceHost("mnote")}/api/mnote/search/note/?isPublic=1` )
    loader: () => fetchWrapper([_getSlides, _getMainText])
      .then(response => {
        if (Array.isArray(response)) {
          return Promise.all(response.map(async r => await r.json()))
        }
      })
      .catch(() => [])
      .finally(() => session.start()),

    // loader: () => fetchWrapper([_getBrands, _getProviders])
    //   .then(response => {
    //     if (Array.isArray(response)) {
    //       return Promise.all(response.map(async r => await r.json()))
    //     }
    //   })
    //   .catch(() => redirect('/auth'))
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


async function _getSlides() {
  return fetch(`${serviceHost("mnote")}/api/mnote/search/note/?isPublic=1`);
}

async function _getMainText() {
  return fetch(`${serviceHost("informator")}/api/informator/about/mainPage`);
}