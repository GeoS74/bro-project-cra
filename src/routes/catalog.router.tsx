import Catalog from "../components/catalog/Catalog"
import NotFound from "../components/NotFound"

export default {
  path: "/catalog",
  element: <Catalog />,
  children: [
    {
      path: "foo",
      element: <NotFound />
    }
  ]
}