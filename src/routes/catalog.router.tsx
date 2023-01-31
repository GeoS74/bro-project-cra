import Catalog from "../components/catalog/Catalog"
import Search from "../components/catalog/Search/Search"
import SimpleList from "../components/SimpleList/SimpleList"
import UploadPrice from "../components/catalog/UploadPrice/UploadPrice"
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
      element: <SimpleList typeList="brands" />,
      loader: () => fetch(`${config.catalog.back.host}:${config.catalog.back.port}/api/bridge/brands`)
        .catch(error => {
          console.log(error.message);
          return [];
        })
    },
    {
      path: "/catalog/edit/providers",
      element: <><></><SimpleList typeList="providers" /></>,
      loader: () => fetch(`${config.catalog.back.host}:${config.catalog.back.port}/api/bridge/providers`)
        .catch(error => {
          console.log(error.message);
          return [];
        })
    },
    {
      path: "/catalog/edit/upload",
      element: <UploadPrice />,
      loader: () => {
        return Promise.all([
          fetch(`${config.catalog.back.host}:${config.catalog.back.port}/api/bridge/brands`)
            .then(async res => await res.json()),
          fetch(`${config.catalog.back.host}:${config.catalog.back.port}/api/bridge/providers`)
            .then(async res => await res.json()),
        ])
          .catch(error => {
            console.log(error.message);
            return [[],[]];
          })
      }
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