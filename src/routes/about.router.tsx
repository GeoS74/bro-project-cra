import { redirect } from "react-router-dom";
import tokenManager from "../libs/token.manager"
import session from "../libs/token.manager"
import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"

import About from "../components/About/About"

export default {
  path: "/about",
  children: [
    {
      path: "/about/company",
      element: <About alias="company" />,
      loader: () => fetchWrapper(_getAboutCompany)
        .catch(() => [])
    },
    {
      path: "/about/credential",
      element: <><></><About alias="credential"/></>,
      loader: () => fetchWrapper(_getAboutCredential)
        .catch(() => [])
    },
  ]
}

function _getAboutCompany() {
  return fetch(`${serviceHost("informator")}/api/informator/about/company`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getAboutCredential() {
  return fetch(`${serviceHost("informator")}/api/informator/about/credential`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}