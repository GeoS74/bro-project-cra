import { redirect, LoaderFunctionArgs } from "react-router-dom";

import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"
import tokenManager from "../libs/token.manager"
import session from "../libs/token.manager";

import { responseNotIsArray } from "../middleware/response.validator";
import DocFlow from "../components/DocFlow/DocFlow"
import DocList from "../components/DocFlow/DocList/DocList"
import DocPage from "../components/DocFlow/DocPage/DocPage";
import DocBarPanel from "../components/DocFlow/DocBarPanel/DocBarPanel";
// import DocRow from "../components/DocFlow/DocRow/DocRow";

export default {
  path: "/docflow",
  element: <DocFlow />,
  children: [
    // {
    //   index: true,
    //   element: <DocList />,
    //   loader: () => fetchWrapper(_getDocs).catch(() => redirect('/auth'))
    // },    
    {
      index: true,
      element: <DocBarPanel />,
      loader: () => session.start(),
    },
    {
      path: "/docflow/list",
      element: <DocList />,
      loader: ({ request }: LoaderFunctionArgs) => new Promise<URL>(res => res(new URL(request.url)))
        .then(url => fetchWrapper(() => _getDocs(url.search)))
        .then(responseNotIsArray)
        .then(async res => {
          if (res.status === 403) {
            return redirect('/docflow')
          }
          return res;
        })
        .catch(() => redirect('/auth'))
    },
    {
      path: "/docflow/:id",
      element: <DocPage />,
      loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(() => _getDoc(params.id))
        .then(responseNotIsArray)
        .then(res => {
          if (res.status === 404) {
            return redirect('/docflow')
          }
          return res;
        })
        .catch(() => redirect('/auth'))
    },
    {
      path: "/docflow/create/doc",
      element: <DocPage />,
      // loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(() => _getDoc(params.id))
      //   .then(responseNotIsArray)
      //   .then(res => {
      //     if (res.status === 404) {
      //       return redirect('/docflow')
      //     }
      //     return res;
      //   })
      //   .catch(() => redirect('/auth'))
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

function _getDocs(queryParams: string) {
  return fetch(`${serviceHost("informator")}/api/informator/docflow/search/doc/${queryParams}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}