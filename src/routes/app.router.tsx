import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import catalogRouter from './catalog.router'
import authRouter from './auth.router'
import aboutCompanyRouter from './about.router'
import userRouter from './user.router'
import settingAccesRouter from "./settingAcces";

export const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect('/catalog'),
  },
  catalogRouter,
  authRouter,
  aboutCompanyRouter,
  userRouter,
  settingAccesRouter
])

export default <RouterProvider router={router} />