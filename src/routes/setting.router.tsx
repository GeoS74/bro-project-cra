import { redirect } from "react-router-dom";

import serviceHost from "../libs/service.host"
import tokenManager from "../classes/TokenManager"
import fetchWrapper from "../libs/fetch.wrapper"

import Setting from "../components/Setting/Setting"
// import Search from "../components/catalog/Search/Search"
import SimpleList from "../components/SimpleList/SimpleList"

export default {
  path: "/setting",
  element: <Setting />,
  children: [
    // {
    //   index: true,
    //   element: <Search />,
    // },
    {
      path: "/setting/edit/roles",
      element: <SimpleList typeList="roles" />,
      loader: () => fetchWrapper(_getRoles).catch(() => redirect('/auth'))
    },
    {
      path: "/setting/edit/actions",
      element: <><></><SimpleList typeList="actions" /></>,
      loader: () => fetchWrapper(_getActions).catch(() => redirect('/auth'))
    },
    {
      path: "/setting/edit/processes",
      element: <><></><></><SimpleList typeList="tasks" /></>,
      loader: () => fetchWrapper(_getProcesses).catch(() => redirect('/auth'))
    },
  ]
}

function _getRoles() {
  return fetch(`${serviceHost("informator")}/api/informator/role`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getActions() {
  return fetch(`${serviceHost("informator")}/api/informator/action`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getProcesses() {
  return fetch(`${serviceHost("informator")}/api/informator/task`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}
