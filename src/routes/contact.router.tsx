import { redirect, LoaderFunctionArgs } from "react-router-dom";

import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"
import tokenManager from "../libs/token.manager"
import { responseNotIsArray } from "../middleware/response.validator";
import session from "../libs/token.manager";

import Contact from "../components/Contact/Contact";
import ContactList from "../components/Contact/ContactList/ContactList";
import ContactPage from "../components/Contact/ContactPage/ContactPage";
import ContactEditForm from "../components/Contact/ContactEditForm/ContactEditForm";


export default {
  path: "/contacts",
  element: <Contact />,
  children: [
    {
      index: true,
      element: <ContactList />,
      loader: ({ request }: LoaderFunctionArgs) => new Promise<URL>(res => res(new URL(request.url)))
        .then(url => url.searchParams.get('search') || '')
        .then(search => fetchWrapper(() => _getSearch(search)))
        .then(responseNotIsArray)
        .catch(() => redirect('/auth'))
    },
    {
      path: "/contacts/page/:id",
      element: <ContactPage />,
      loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(() => _getContact(params.id))
        .then(responseNotIsArray)
        .then(res => {
          if (res.status === 404) {
            return redirect('/contacts')
          }
          return res;
        })
        .catch(() => redirect('/auth'))
    },
    {
      path: "/contacts/create",
      element: <ContactEditForm />,
      loader: () => session.start(),
    },
    {
      path: "/contacts/edit/:id",
      element: <ContactEditForm />,
      loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(() => _getContact(params.id))
        .then(responseNotIsArray)
        .then(res => {
          if (res.status === 404) {
            return redirect('/contacts')
          }
          return res;
        })
        .catch(() => redirect('/auth'))
    },
  ]
}

function _getSearch(query: string) {
  return fetch(`${serviceHost("signum")}/api/contact/?search=${query || ''}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getContact(id?: string) {
  return fetch(`${serviceHost("signum")}/api/contact/${id || ''}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}