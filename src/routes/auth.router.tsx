import Navigate from "../components/navigate/Navigate"
import { AuthForm } from "../components/AuthForm/AuthForm"

export default {
  path: "/auth",
  element: <>
    <Navigate />
    <AuthForm />
  </>
}