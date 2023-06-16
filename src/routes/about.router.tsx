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
      loader: () => fetchWrapper(() => _getAbout("company"))
        .catch(() => [])
    },
    {
      path: "/about/credential",
      element: <><></><About alias="credential"/></>,
      loader: () => fetchWrapper(() => _getAbout("credential"))
        .catch(() => [])
    },
    {
      path: "/about/garanty",
      element: <><></><></><About alias="garanty"/></>,
      loader: () => fetchWrapper(() => _getAbout("garanty"))
        .catch(() => [])
    },
    {
      path: "/about/contact",
      element: <><></><></><></><About alias="contact"/></>,
      loader: () => fetchWrapper(() => _getAbout("contact"))
        .catch(() => [])
    },
  ]
}

function _getAbout(alias: string) {
  return fetch(`${serviceHost("informator")}/api/informator/about/${alias}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}