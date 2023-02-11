import About from "../components/About/About"
import serviceHost from "../libs/service.host"

export default {
  path: "/about",
  element: <About />,
  loader: () => fetch(`${serviceHost("informator")}/api/informator/about/company`)
    .catch(error => {
      console.log(error.message);
      return [];
    })
}