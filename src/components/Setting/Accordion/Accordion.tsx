import Role from "./Role/Role"

import styles from "./styles.module.css"
import classNames from "classnames"

type Props = {
  roles: IRow[],
  directings: IRow[],
  tasks: IRow[],
  actions: IRow[],
  accessSettings: IRole[]
}

export default function Accordion({ roles, directings, tasks, actions, accessSettings }: Props) {
  return <div className={classNames(styles.root, "accordion")}>

    {roles.map(role => <Role
      key={role.id}
      role={role}
      directings={directings}
      tasks={tasks}
      actions={actions}
      accessSettings={accessSettings}
    />)}
  </div>
}