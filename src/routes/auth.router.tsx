import Auth from "../components/Auth/Auth"
import { AuthForm } from "../components/Auth/AuthForm/AuthForm"

export default {
  path: "/auth",
  element: <Auth />,
  children: [
    {
      index: true,
      element: <AuthForm />,
    },
  ]
}