import Catalog from "../components/catalog/Catalog"
import Search from "../components/catalog/Search/Search"
import Edit from "../components/catalog/Edit/Edit"

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
      loader: () => fetch('http://localhost:3500/api/brands')
        .catch(error => error.message)
    },
    {
      path: "/catalog/edit/providers",
      element: <Edit type="providers"/>,
      loader: () => fetch('http://localhost:3500/api/providers')
        .catch(error => error.message)
    },
    {
      path: "/catalog/edit/upload",
      element: <h1>upload</h1>
    }
  ]
}