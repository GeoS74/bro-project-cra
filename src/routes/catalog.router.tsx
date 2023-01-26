import Catalog from "../components/catalog/Catalog"
import Search from "../components/catalog/Search/Search"
import Edit from "../components/catalog/Edit/Edit"
import Test from "../components/catalog/Test/Test"
import config from "../config"

export default {
  path: "/catalog",
  element: <Catalog />,
  children: [
    {
      index: true,
      element: <Search />,
    },
    {
      path: "/catalog/edit/brands",
      element: <Edit type="brands"/>,
      loader: () => fetch(`${config.catalog.back.host}:${config.catalog.back.port}/api/brands`)
        .catch(error => error.message)
    },
    {
      path: "/catalog/edit/providers",
      element: <Edit type="providers"/>,
      loader: () => fetch(`${config.catalog.back.host}:${config.catalog.back.port}/api/providers`)
        .catch(error => error.message)
    },
    {
      path: "/catalog/edit/upload",
      element: <h1>upload</h1>
    },
    {
      path: "/catalog/edit/test",
      element: <Test />
    },
  ]
}