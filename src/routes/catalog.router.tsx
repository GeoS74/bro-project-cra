import { redirect } from "react-router-dom";

import Catalog from "../components/catalog/Catalog"
import Search from "../components/catalog/Search/Search"
import SimpleList from "../components/SimpleList/SimpleList"
import UploadPrice from "../components/catalog/UploadPrice/UploadPrice"
import DownloadPrice from "../components/catalog/DownloadPrice/DownloadPrice";
import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"
import tokenManager from "../libs/token.manager"
import session from "../libs/token.manager"

export default {
  path: "/catalog",
  element: <Catalog />,
  children: [
    {
      index: true,
      element: <Search />,
      loader: () => session.start(),
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
      path: "/catalog/download/price",
      element: <><DownloadPrice /></>,
      loader: () => session.start(),
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
