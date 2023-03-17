import { useLoaderData } from "react-router-dom";

import styles from "./styles.module.css"

export default function BundleRole() {
  const [users, roles] = useLoaderData() as [IUser[], IRow[]];

  return <div className={styles.root}>
    <h3 className="mb-4">Привязка ролей пользователей</h3>

    {_makeList(users)}
  </div>
}

function _makeList(users: IUser[]) {
  return users.map(user => {
    return <div className="card mt-2" key={user.email}
      onMouseEnter={_showOptionalButton}
      onMouseLeave={_showOptionalButton}
    >

      <div>
        <p>
          {user.email}
          <span className="text-muted" hidden={true}>назначить роль</span>
        </p>

        <span className="mt-2">Роль: Admin</span>
      </div>
    </div>
  })
}

function _showOptionalButton(event: React.MouseEvent<HTMLParagraphElement>) {
  const optionalButton = event.currentTarget.querySelector('span') as HTMLElement;
  optionalButton.hidden = !optionalButton?.hidden;
}