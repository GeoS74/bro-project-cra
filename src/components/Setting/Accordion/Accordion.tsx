import styles from "./styles.module.css"
import classNames from "classnames"

type Props = {
  roles: IRow[],
  tasks: IRow[],
  actions: IRow[]
}

export default function Accordion({ roles, tasks, actions }: Props) {
  return <div className={classNames(styles.root, "accordion")}>

    {roles.map(role => {
      return <div className="accordion-item" key={role.id}>

        {_getRoleTitle(role.title)}

        <div className="accordion-collapse collapse">
          <div className="accordion-body">
            {_getTasksList(role.id.toString(), tasks, actions)}
          </div>
        </div>

      </div>
    })}

  </div>
}

function _getRoleTitle(title: string) {
  return <h2 className="accordion-header" onClick={(event) => collapser(event)}>
    <span className="accordion-button collapsed">
      {title}
    </span>
  </h2>
}

function _getTasksList(roleId: string, tasks: IRow[], actions: IRow[]) {
  return tasks.map(task => {
    return <>
      {_getTask(roleId, task)}

      {_getActionsList(roleId, task.id.toString(), actions)}
    </>
  })
}

function _allCheckboxOn(event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) {
  event.currentTarget.parentElement
    ?.querySelectorAll('input[type=checkbox]')
    .forEach(elem => {
      (elem as HTMLInputElement).checked = true;
    })
}

function _getActionsList(roleId: string, taskId: string, actions: IRow[]) {
  return <div hidden={true} className={styles.actionsList}>

    <p onClick={_allCheckboxOn} className="mb-2 text-muted">Выделить все</p>

    {actions.map(action => _getAction(roleId, taskId, action))}
  </div>
}

function _getAction(roleId: string, taskId: string, action: IRow) {
  return <p key={roleId + taskId + action.id}>
    <input type="checkbox" name={`${taskId}[${action.id}]`} className="form-check-input" id={roleId + taskId + action.id} />

    <label className="form-check-label" htmlFor={roleId + taskId + action.id}>
      {action.title}
    </label>
  </p>
}

function _getTask(roleId: string, task: IRow) {
  return <div className={styles.task}
    key={roleId + task.id}
    onMouseEnter={_showOptionalButton}
    onMouseLeave={_showOptionalButton}
  >

    <input type="checkbox" name={`${roleId}[${task.id}]`} className="form-check-input" id={roleId + task.id} />

    <label className="form-check-label" htmlFor={roleId + task.id}>
      {task.title}
    </label>

    <span onClick={_showActionsList} className="text-muted" hidden={true}>показать действия</span>
  </div>
}

function _showOptionalButton(event: React.MouseEvent<HTMLParagraphElement>) {
  const optionalButton = event.currentTarget.querySelector('span') as HTMLElement;
  optionalButton.hidden = !optionalButton?.hidden;
}


function _showActionsList(event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) {
  const divActionsList = event.currentTarget.parentElement?.nextElementSibling as HTMLDivElement
  divActionsList.hidden = !divActionsList.hidden;

  event.currentTarget.innerText = divActionsList.hidden ? "показать действия" : "скрыть"
}

function collapser(event: React.MouseEvent<HTMLHeadingElement, MouseEvent>) {
  event.currentTarget.firstElementChild?.classList.toggle("collapsed")
  event.currentTarget.nextElementSibling?.classList.toggle("collapse")
}
