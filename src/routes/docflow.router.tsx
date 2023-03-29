import { redirect, LoaderFunctionArgs } from "react-router-dom";

import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"
import tokenManager from "../libs/token.manager"

import DocFlow from "../components/DocFlow/DocFlow"
import DocList from "../components/DocFlow/DocList/DocList"
import DocPage from "../components/DocFlow/DocPage/DocPage";

export default {
  path: "/docflow",
  element: <DocFlow />,
  children: [
    {
      index: true,
      element: <DocList />,
      loader: () => fetchWrapper(_getDocs).catch(() => redirect('/auth'))
    },
    {
      path: "/docflow/:id",
      element: <DocPage />,
      loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(() => _getDoc(params.id))
        .catch(() => redirect('/auth'))
    }
  ]
}

function _getDoc(id?: string) {
  return fetch(`${serviceHost("informator")}/api/informator/docflow/${id}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getDocs() {
  return fetch(`${serviceHost("informator")}/api/informator/docflow`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}