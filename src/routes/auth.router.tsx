import { Outlet } from "react-router-dom"
import Navigate from "../components/navigate/Navigate"
import { AuthForm } from "../components/AuthForm/AuthForm"
import { InfoCard } from "../components/AuthForm/InfoCard/InfoCard"
import config from "../config"

export default {
  path: "/auth",
  element: <>
    <Navigate />
    <Outlet />
  </>,
  children: [
    {
      index: true,
      element: <AuthForm />,
    },
    {
      path: "/auth/confirm/:token",
      element: <InfoCard mode="confirm"/>,
      loader: ({ params }: { params: unknown }) => {

        if (typeof params === 'object' && params !== null) {
          if ("token" in params) {
            return fetch(`${config.auth.back.host || ''}${config.auth.back.port ? ':' : ''}${config.auth.back.port || ''}/api/mauth/confirm/${params.token}`)
              .then(res => res.status)
              .catch(error => {
                console.log(error.message);
                return 500;
              })
          }
        }
      }
    },
  ]
}
