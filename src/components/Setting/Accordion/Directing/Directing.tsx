import AccordionCheckbox from "../AccordionCheckbox/AccordionCheckbox"
import Task from "../Task/Task"

import styles from "./styles.module.css"

type Props = {
  role: IRow,
  directing: IRow,
  tasks: IRow[],
  actions: IRow[],
  accessSettings: IRole[]
}

export default function Directing({ role, directing, tasks, actions, accessSettings }: Props) {
  return <div className={styles.root}
    onMouseEnter={_showOptionalButton}
    onMouseLeave={_showOptionalButton}>

    <AccordionCheckbox
      id={(role.id + directing.id).toString()}
      name={`id_${role.id}[id_${directing.id}][]`}
      title={directing.title}

      checked={false}
    // checked={isCheckedTask(roleId, task.id.toString(), accessSettings)}
    />

    <span onClick={_showHideList} className="text-muted" hidden={true}>показать список</span>

    <div hidden={true} className={styles.checkboxList}>
      <p onClick={_allCheckboxOn} className="mt-2 text-muted">Выделить все</p>

      {tasks.map(task => <Task
        key={role.id + directing.id + task.id}
        role={role}
        directing={directing}
        task={task}
        actions={actions}
        accessSettings={accessSettings}
      />)}
    </div>
  </div>
}

function _showOptionalButton(event: React.MouseEvent<HTMLParagraphElement>) {
  const optionalButton = event.currentTarget.querySelector('span') as HTMLElement;
  optionalButton.hidden = !optionalButton?.hidden;
}

function _showHideList(event: React.MouseEvent<HTMLElement, MouseEvent>) {
  const divActionsList = event.currentTarget.nextElementSibling as HTMLDivElement
  divActionsList.hidden = !divActionsList.hidden;

  event.currentTarget.innerText = divActionsList.hidden ? "показать список" : "свернуть"
}

function _allCheckboxOn(event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) {
  event.currentTarget.parentElement?.childNodes
    .forEach(elem => {
      if (elem.nodeName === 'DIV') {
        (elem.firstChild as HTMLInputElement).checked = true;
      }
    })
}