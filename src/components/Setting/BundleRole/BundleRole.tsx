import { useLoaderData } from "react-router-dom";

import RolePane from "./RolePane/RolePane"
import styles from "./styles.module.css"

export default function BundleRole() {
  const [users, roles] = useLoaderData() as [IUser[], IRow[]];

  return <div className={styles.root}>
    <h3 className="mb-4">Привязка ролей пользователей</h3>

    {users.map((user, i) => <div className="card mt-2" key={i}>

      <h5>Пользователь: {user.email}</h5>

      <RolePane currentUser={user} roles={roles} />
    </div>
    )}
  </div>
}
