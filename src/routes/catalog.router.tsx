import Catalog from "../components/catalog/Catalog"
import Search from "../components/catalog/Search/Search"
import SimpleList from "../components/SimpleList/SimpleList"
import UploadPrice from "../components/catalog/UploadPrice/UploadPrice"
import Test from "../components/catalog/Test/Test"
import Test2 from "../components/catalog/Test/Test2"
import serviceHost from "../libs/service.host"

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
      loader: () => fetch(`${serviceHost("bridge")}/api/bridge/brands`)
        .catch(error => {
          console.log(error.message);
          return [];
        })
    },
    {
      path: "/catalog/edit/providers",
      element: <><></><SimpleList typeList="providers" /></>,
      loader: () => fetch(`${serviceHost("bridge")}/api/bridge/providers`)
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
          fetch(`${serviceHost("bridge")}/api/bridge/brands`)
            .then(async res => await res.json()),
          fetch(`${serviceHost("bridge")}/api/bridge/providers`)
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

// function _query(){
//   return fetch(`${serviceHost("bridge")}/api/bridge/brands`)
//   .then(async res => await res.json())
// }