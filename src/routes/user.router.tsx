import User from "../components/User/User"
import serviceHost from "../libs/service.host"

export default {
  path: "/about",
  element: <User />,
  loader: () => fetch(`${serviceHost("informator")}/api/informator/user`)
    .catch(error => {
      console.log(error.message);
      return undefined;
    })
}