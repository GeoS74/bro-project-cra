import Docs from "../components/Docs/Docs"
import Task from "../components/Docs/Task/Task"
import session from "../libs/token.manager"

export default {
    path: "/docs",
    element: <Docs />,
    children: [
      {
        index: true,
        element: <Task />,
        loader: () => session.start(),
      }
    ]
  }