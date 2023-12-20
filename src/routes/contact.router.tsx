import { redirect, LoaderFunctionArgs } from "react-router-dom";

import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"
import tokenManager from "../libs/token.manager"
import { responseNotIsArray } from "../middleware/response.validator";
import session from "../libs/token.manager";

import Contact from "../components/Contact/Contact";
import ContactList from "../components/Contact/ContactList/ContactList";


export default {
  path: "/contacts",
  element: <Contact />,
  children: [
    {
      index: true,
      element: <ContactList />,
      loader: () => fetchWrapper(() => _getContacts())
        .then(responseNotIsArray)
        .catch(() => redirect('/'))
        .finally(() => session.start()),
    },
    // {
    //   path: "/docflow/list",
    //   element: <DocList />,
    //   loader: ({ request }: LoaderFunctionArgs) => new Promise<URL>(res => res(new URL(request.url)))
    //     .then(url => fetchWrapper(() => _searchDocs(url.search)))
    //     .catch(() => redirect('/auth'))
    // },
    // {
    //   path: "/docflow/:id",
    //   element: <DocPage />,
    //   loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(() => _getDoc(params.id))
    //     .then(responseNotIsArray)
    //     .then(res => {
    //       if (res.status === 404) {
    //         return redirect('/docflow')
    //       }
    //       return res;
    //     })
    //     .catch(() => redirect('/auth'))
    // },
    // {
    //   path: "/docflow/create/doc",
    //   element: <CreateDoc />,
    //   loader: () => session.start(),
    // },
    // {
    //   path: "/docflow/create/invoice",
    //   element: <CreateDoc tpl="invoice" />,
    //   loader: () => session.start(),
    // },
    // {
    //   path: "/docflow/edit/doc/:id",
    //   element: <EditDoc />,
    //   loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(() => _getDoc(params.id))
    //     .then(responseNotIsArray)
    //     .then(res => {
    //       if (res.status === 404) {
    //         return redirect('/docflow')
    //       }
    //       return res;
    //     })
    //     .catch(() => redirect('/auth'))
    // },
  ]
}

function _getContacts() {
  return fetch(`${serviceHost("signum")}/api/contact`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}