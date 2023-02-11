import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import catalogRouter from './catalog.router'
import authRouter from './auth.router'
import aboutCompanyRouter from './about.router'

export const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect('/catalog'),
  },
  catalogRouter,
  authRouter,
  aboutCompanyRouter
])

export default <RouterProvider router={router} />