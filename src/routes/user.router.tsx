import { redirect } from "react-router-dom";

import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"
import User from "../components/User/User"
import tokenManager from "../classes/TokenManager"

export default {
  path: "/user",
  element: <User />,
  loader: async () => {

    try {
      const me = await _getMe();
      const user = await _getUser();
      return {
        ...me,
        ...user
      }
    }
    catch (error) {
      return redirect('/auth')
    }
  }
}

function _getMe() {
  return fetchWrapper(() => fetch(`${serviceHost("mauth")}/api/mauth/access/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  }))
    .then(async res => {
      if (res.ok) return await res.json()
      throw new Error()
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
    .then(async res => {
      if (res.ok) return await res.json()
    })
}