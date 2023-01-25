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
      element: <Edit />
    },
    {
      path: "/catalog/edit/providers",
      element: <h1>providers</h1>
    },
    {
      path: "/catalog/edit/upload",
      element: <h1>upload</h1>
    }
  ]
}