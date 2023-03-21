import tokenManager from "../classes/TokenManager"
import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"

import About from "../components/About/About"

export default {
  path: "/about",
  element: <About />,
  loader: () => fetchWrapper([_getAboutCompany, _getMe])
        .then(response => {
          if (Array.isArray(response)) {
            return Promise.all(response.map(async r => await r.json()))
          }
        })
        .catch(() => [])
}

function _getAboutCompany(){
  return fetch(`${serviceHost("informator")}/api/informator/about/company`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getMe() {
  return fetch(`${serviceHost("mauth")}/api/mauth/access/`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}