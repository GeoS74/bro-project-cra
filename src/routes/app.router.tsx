import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import catalogRouter from './catalog.router'

export const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect('/catalog')
  },
  catalogRouter
])

export default <RouterProvider router={router} />