import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Main from '../components/Main';
import Catalog from '../components/catalog/Catalog';
import NotFound from '../components/NotFound';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/catalog",
        element: <Catalog />,
        children: [
          {
            path: "foo",
            element: <NotFound />
          }
        ]
      },
    ]
  },
  {
    path: "*",
    element: <h1>not found this</h1>
  },
  // {
  //   path: "/catalog",
  //   element: <Catalog />
  // },
  // {
  //   path: "/catalog/foo",
  //   element: <NotFound />
  // },
  // {
  //   path: "*",
  //   element: <h1>not found</h1>
  // },
  // {
  //   path: "/auth",
  //   element: <h1>Hello world</h1>
  // }
])

export default <RouterProvider router={router} />