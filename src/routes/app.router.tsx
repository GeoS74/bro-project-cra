import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import catalogRouter from './catalog.router'
import authRouter from './auth.router'

export const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect('/catalog'),
  },
  catalogRouter,
  authRouter
])

export default <RouterProvider router={router} />