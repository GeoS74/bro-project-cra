import { redirect } from "react-router-dom";

import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"
import arrFetchWrapper from "../libs/arr.fetch.wrapper"
import User from "../components/User/User"
import tokenManager from "../classes/TokenManager"

export default {
  path: "/user",
  element: <User />,
  loader: () => _aboutMe().catch(() => redirect('/auth'))
}

async function _aboutMe() {
  return arrFetchWrapper([
    _getMe,
    _getUser
  ])
    .then(async res => ({
      ...await _me(res[0]),
      ...await _user(res[1]),
    }))
}

async function _me(res: Response) {
  if (res.ok) return await res.json()
  throw new Error()
}

async function _user(res: Response) {
  if (res.ok) return await res.json()
  if (res.status === 404) return await _createUser()
  throw new Error()
}

function _getMe() {
  return fetch(`${serviceHost("mauth")}/api/mauth/access/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
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