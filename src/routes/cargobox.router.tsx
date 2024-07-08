import Cargobox from "../components/Cargobox/Cargobox"
import Calculator from "../components/Cargobox/Calculator/Calculator"

export default {
  path: "/cargobox",
  element: <Cargobox />,
  children: [
    {
      index: true,
      element: <Calculator />,
    },
  ]
}
