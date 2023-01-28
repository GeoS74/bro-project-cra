import Catalog from "../components/catalog/Catalog"
import Search from "../components/catalog/Search/Search"
import SimpleList from "../components/SimpleList/SimpleList"
import Test from "../components/catalog/Test/Test"
import Test2 from "../components/catalog/Test/Test2"
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
      element: <SimpleList typeList="brands"/>,
      loader: () => fetch(`${config.catalog.back.host}:${config.catalog.back.port}/api/brands`)
        .catch(error => error.message)
    },
    {
      path: "/catalog/edit/providers",
      element: <><></><SimpleList typeList="providers"/></>,
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
    {
      path: "/catalog/edit/test2",
      element: <Test2 />
    },
  ]
}