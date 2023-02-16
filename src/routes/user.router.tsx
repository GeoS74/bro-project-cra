import { redirect } from "react-router-dom";

import serviceHost from "../libs/service.host"
import queryWrapper from "../libs/query.wrapper"
import User from "../components/User/User"
import tokenManager from "../classes/TokenManager"

export default {
  path: "/user",
  element: <User />,
  loader: async () => {

    const user = await queryWrapper(() => _aboutMe())

    return user || redirect('/auth')

    // try {
    //   return await _aboutMe()
    // }
    // catch (error: unknown) {

    //   if (error instanceof Error && error.message === "401") {
    //     try {
    //       if(await tokenManager.refreshTokens()) {
    //         return await _aboutMe()
    //       }
    //     }
    //     catch (e) {/**/}
    //   }
    // }
    // return redirect('/auth')
  }
}


async function _aboutMe() {
  return Promise.all([
    _getUser(),
    _getMe()
  ])
    .then(res => ({
      ...res[0],
      ...res[1]
    }))
}

function _getMe() {
  return fetch(`${serviceHost("mauth")}/api/mauth/access/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
    .then(async res => {
      if (res.ok) {
        return await res.json()
      }
      if (res.status === 401) {
        throw new Error("401")
      }
    })
}

function _getUser() {
  return fetch(`${serviceHost("informator")}/api/informator/user/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
    .then(async res => {
      if (res.ok) {
        return await res.json()
      }

      if (res.status === 404) {
        return await _createUser()
      }

      if (res.status === 401) {
        throw new Error("401")
      }
    })
}

function _createUser() {
  return fetch(`${serviceHost("informator")}/api/informator/user/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}