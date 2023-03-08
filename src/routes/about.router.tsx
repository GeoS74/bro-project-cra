import About from "../components/About/About"
import serviceHost from "../libs/service.host"

export default {
  path: "/about",
  element: <About />,
  loader: async () => fetch(`${serviceHost("informator")}/api/informator/about/company`)
    .catch(() => ({}))
}