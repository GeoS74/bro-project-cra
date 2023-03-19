import AccordionCheckbox from "../AccordionCheckbox/AccordionCheckbox"

import styles from "./styles.module.css"

type Props = {
  role: IRow,
  directing: IRow,
  task: IRow,
  action: IRow,
  accessSettings: IRole[]
}

export default function Action({ role, directing, task, action, accessSettings }: Props) {
  return <div className={styles.root}>

    <AccordionCheckbox
      id={(role.id + directing.id + task.id + action.id).toString()}
      name={`id_${role.id}[id_${directing.id}][id_${task.id}][id_${action.id}]`}
      title={action.title}

      checked={false}
    // checked={isCheckedTask(roleId, task.id.toString(), accessSettings)}
    />
  </div>
}