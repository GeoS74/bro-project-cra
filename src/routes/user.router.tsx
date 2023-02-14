import { redirect } from "react-router-dom";

import serviceHost from "../libs/service.host"
import User from "../components/User/User"
import tokenManager from "../classes/TokenManager"

export default {
  path: "/user",
  element: <User />,
  loader: async () => {

    if (!tokenManager.getAccess()) {
      if (!await tokenManager.refreshTokens()) {
        return redirect('/auth')
      }
    }

    const user = await Promise.all([
      _getUser(),
      _getMe()
    ])
      .catch(() => redirect('/auth'))

    if (Array.isArray(user)) {
      return {
        ...user[0],
        ...user[1]
      }
    }
  }
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
      throw new Error()
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

      throw new Error()
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