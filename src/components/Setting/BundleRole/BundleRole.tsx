import { useLoaderData } from "react-router-dom";

import styles from "./styles.module.css"

export default function BundleRole() {
  const [users, roles] = useLoaderData() as [IUser[], IRow[]];

  return <div className={styles.root}>
    <h3>Привязка ролей пользователей</h3>

    {_makeList(users)}
  </div>
}

function _makeList(users: IUser[]) {
  return users.map(user => {
    return <div className="card mt-2" key={user.email}>

      <div>{user.email}</div>

    </div>
  })
}