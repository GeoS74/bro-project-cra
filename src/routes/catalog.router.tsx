import { redirect } from "react-router-dom";

import Catalog from "../components/catalog/Catalog"
import Search from "../components/catalog/Search/Search"
import SimpleList from "../components/SimpleList/SimpleList"
import UploadPrice from "../components/catalog/UploadPrice/UploadPrice"
import Test from "../components/catalog/Test/Test"
import Test2 from "../components/catalog/Test/Test2"
import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"
import tokenManager from "../classes/TokenManager"

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
      loader: () => _getBrands().catch(() => redirect('/auth'))
    },
    {
      path: "/catalog/edit/providers",
      element: <><></><SimpleList typeList="providers" /></>,
      loader: () => _getProviders().catch(() => redirect('/auth'))
    },
    {
      path: "/catalog/edit/upload",
      element: <UploadPrice />,
      loader: () => _getBrandsAndProviders()
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

async function _getBrandsAndProviders(){
  try {
    const brands = await _getBrands()
      .then(async res => {
        if (res.ok) return await res.json()
        throw new Error()
      })

    const providers = await _getProviders()
      .then(async res => {
        if (res.ok) return await res.json()
        throw new Error()
      })
    return [brands, providers]
  } catch (error) {
    return redirect('/auth')
  }
}

function _getBrands() {
  return fetchWrapper(() => fetch(`${serviceHost("bridge")}/api/bridge/brands`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  }))
}

function _getProviders() {
  return fetchWrapper(() => fetch(`${serviceHost("bridge")}/api/bridge/providers`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  }))
}
