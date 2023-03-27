import tokenManager from "../libs/token.manager"
import session from "../libs/token.manager"
import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"

import About from "../components/About/About"

export default {
  path: "/about",
  element: <About />,
  loader: () => fetchWrapper(_getAboutCompany)
    .catch(() => [])
    .finally(() => session.start())
}

function _getAboutCompany() {
  return fetch(`${serviceHost("informator")}/api/informator/about/company`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}