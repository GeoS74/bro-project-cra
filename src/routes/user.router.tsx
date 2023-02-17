import { redirect } from "react-router-dom";

import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"
import User from "../components/User/User"
import tokenManager from "../classes/TokenManager"

export default {
  path: "/user",
  element: <User />,
  loader: async () => {

    const user = await _aboutMe().catch(() => null)
    // return user || redirect('/auth')
    console.log(user)
    return user || []

  }
}




async function _aboutMe() {
  return Promise.all([
    // _getMe(),
    _getUser()
  ])
    .then(res => ({
      ...res[0],
      // ...res[1]
    }))
}










// async function _aboutMe() {
//   return Promise.all([
//     _getUser(),
//     _getMe()
//   ])
//     .then(res => ({
//       ...res[0],
//       ...res[1]
//     }))
// }

function _getMe() {
  return fetchWrapper(() => fetch(`${serviceHost("mauth")}/api/mauth/access/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  }))
  .then(async res => {
    if(res.ok) return await res.json()
  })
}

function _getUser() {
  return fetchWrapper(() => fetch(`${serviceHost("informator")}/api/informator/user/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  }))
    .then(async res => {
      if (res.ok) return await res.json()
      if (res.status === 404) return await _createUser()
    })
}

function _createUser() {
  return fetch(`${serviceHost("informator")}/api/informator/user/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
  .then(async res => {
    if(res.ok) return await res.json()
  })
}