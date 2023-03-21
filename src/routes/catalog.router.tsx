import { redirect } from "react-router-dom";

import Catalog from "../components/catalog/Catalog"
import Search from "../components/catalog/Search/Search"
import SimpleList from "../components/SimpleList/SimpleList"
import UploadPrice from "../components/catalog/UploadPrice/UploadPrice"
import Test from "../components/catalog/Test/Test"
import Test2 from "../components/catalog/Test/Test2"
import serviceHost from "../libs/service.host"
import tokenManager from "../libs/token.manager"
import fetchWrapper from "../libs/fetch.wrapper"

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
      loader: () => fetchWrapper(_getBrands).catch(() => redirect('/auth'))
    },
    {
      path: "/catalog/edit/providers",
      element: <><></><SimpleList typeList="providers" /></>,
      loader: () => fetchWrapper(_getProviders).catch(() => redirect('/auth'))
    },
    {
      path: "/catalog/edit/upload",
      element: <UploadPrice />,
      loader: () => fetchWrapper([_getBrands, _getProviders])
        .then(response => {
          if (Array.isArray(response)) {
            return Promise.all(response.map(async r => await r.json()))
          }
        })
        .catch(() => redirect('/auth'))
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

function _getBrands() {
  return fetch(`${serviceHost("bridge")}/api/bridge/brands`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getProviders() {
  return fetch(`${serviceHost("bridge")}/api/bridge/providers`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}
