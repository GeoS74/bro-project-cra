import styles from "./styles.module.css"
import classNames from "classnames"

import AccordionCheckbox from "../AccordionCheckbox/AccordionCheckbox"

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
    />)}
  </div>
}

type RoleProps = {
  role: IRow,
  directings: IRow[],
  tasks: IRow[],
  actions: IRow[],
}

function Role({ role, directings, tasks, actions }: RoleProps) {
  return <div className="accordion-item" key={role.id}>
    <h2 className="accordion-header" onClick={(event) => collapser(event)}>
      <span className="accordion-button collapsed">
        {role.title}
      </span>
    </h2>

    <div className="accordion-collapse collapse">
      <div className="accordion-body">

        {directings.map(directing => <Directing
          key={role.id + directing.id}
          role={role}
          directing={directing}
          tasks={tasks}
          actions={actions}
        />)}
      </div>
    </div>
  </div>
}

type DirectingProps = {
  role: IRow,
  directing: IRow,
  tasks: IRow[],
  actions: IRow[],
}

function Directing({ role, directing, tasks, actions }: DirectingProps) {
  return <div className={styles.level}
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
      />)}
    </div>
  </div>
}


type TaskProps = {
  role: IRow,
  directing: IRow,
  task: IRow,
  actions: IRow[],
}

function Task({ role, directing, task, actions }: TaskProps) {
  return <div
    className={styles.level}
    onMouseEnter={_showOptionalButton}
    onMouseLeave={_showOptionalButton}>

    <AccordionCheckbox
      id={(role.id + directing.id + task.id).toString()}
      name={`id_${role.id}[id_${directing.id}][id_${task.id}][]`}
      title={task.title}

      checked={false}
    // checked={isCheckedTask(roleId, task.id.toString(), accessSettings)}
    />

    <span onClick={_showHideList} className="text-muted" hidden={true}>показать действия</span>

    <div hidden={true} className={styles.checkboxList}>
      <p onClick={_allCheckboxOn} className="mt-2 text-muted">Выделить все</p>

      {actions.map(action => <Action
        key={role.id + directing.id + task.id + action.id}
        role={role}
        directing={directing}
        task={task}
        action={action}
      />)}
    </div>
  </div>
}

type ActionProps = {
  role: IRow,
  directing: IRow,
  task: IRow,
  action: IRow,
}

function Action({ role, directing, task, action }: ActionProps) {
  return <div className={styles.level}>

    <AccordionCheckbox
      id={(role.id + directing.id + task.id + action.id).toString()}
      name={`id_${role.id}[id_${directing.id}][id_${task.id}][id_${action.id}]`}
      title={action.title}

      checked={false}
    // checked={isCheckedTask(roleId, task.id.toString(), accessSettings)}
    />
  </div>
}



function _allCheckboxOn(event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) {
  event.currentTarget.parentElement?.childNodes
    .forEach(elem => {
      if (elem.nodeName === 'DIV') {
        (elem.firstChild as HTMLInputElement).checked = true;
      }
    })
}


function _showHideList(event: React.MouseEvent<HTMLElement, MouseEvent>) {
  const divActionsList = event.currentTarget.nextElementSibling as HTMLDivElement
  divActionsList.hidden = !divActionsList.hidden;

  event.currentTarget.innerText = divActionsList.hidden ? "показать список" : "свернуть"
}



// export default function Accordion({ roles, directings, tasks, actions, accessSettings }: Props) {
//   return <div className={classNames(styles.root, "accordion")}>

//     {roles.map(role => {
//       return <div className="accordion-item" key={role.id}>

//         {_getRoleTitle(role.title)}

//         <div className="accordion-collapse collapse">
//           <div className="accordion-body">
//             {/* {_getTasksList(role.id.toString(), tasks, actions, accessSettings)} */}
//           </div>
//         </div>

//       </div>
//     })}
//   </div>
// }

// export default function Accordion({ roles, directings, tasks, actions, accessSettings }: Props) {
//   return <div className={classNames(styles.root, "accordion")}>

//     {roles.map(role => {
//       return <div className="accordion-item" key={role.id}>

//         {_getRoleTitle(role.title)}

//         <div className="accordion-collapse collapse">
//           <div className="accordion-body">
//             {_getDirectingList(role.id.toString(), directings, tasks, actions, accessSettings)}
//             {/* {_getTasksList(role.id.toString(), tasks, actions, accessSettings)} */}
//           </div>
//         </div>

//       </div>
//     })}
//   </div>
// }


// function _getRoleTitle(title: string) {
//   return <h2 className="accordion-header" onClick={(event) => collapser(event)}>
//     <span className="accordion-button collapsed">
//       {title}
//     </span>
//   </h2>
// }

// function _getDirectingList(
//   roleId: string, 
//   directings: IRow[], 
//   tasks: IRow[], 
//   actions: IRow[], 
//   accessSettings:IRole[]
//   ) {
//   return directings.map(directing => <div key={roleId + directing.id}>
//       {_getDirecting(roleId, directing, accessSettings)}

//       {_getTasksList(roleId, directing.id.toString(), tasks, actions, accessSettings)}

//       {/* {_getActionsList(roleId, task.id.toString(), actions, accessSettings)} */}
//     </div>)
// }

// function _getDirecting(roleId: string, directing: IRow, accessSettings: IRole[]) {
//   return <div className={styles.level}
//     key={roleId + directing.id}
//     onMouseEnter={_showOptionalButton}
//     onMouseLeave={_showOptionalButton}
//     >

//     <AccordionCheckbox
//       id={roleId + directing.id}
//       name={`id_${roleId}[id_${directing.id}][]`}
//       title={directing.title}

//       // checked={false}
//       checked={isCheckedDirecting(roleId, directing.id.toString(), accessSettings)}
//     />

//     <span onClick={_showActionsList} className="text-muted" hidden={true}>показать действия</span>
//   </div>
// }




// function _getTasksList(
//   roleId: string, 
//   directingId: string, 
//   tasks: IRow[], 
//   actions: IRow[], 
//   accessSettings:IRole[]
//   ) {
//   return tasks.map(task => <div key={roleId + directingId + task.id}>
//       {_getTask(roleId, directingId, task, accessSettings)}

//       {/* {_getActionsList(roleId, task.id.toString(), actions, accessSettings)} */}
//     </div>)
// }

// function _getTask(roleId: string, directingId: string, task: IRow, accessSettings: IRole[]) {
//   return <div className={styles.level}
//     key={roleId + directingId + task.id}
//     onMouseEnter={_showOptionalButton}
//     onMouseLeave={_showOptionalButton}
//     >

//     <AccordionCheckbox
//       id={roleId + directingId + task.id}
//       name={`id_${roleId}[id_${directingId}][id_${task.id}][]`}
//       title={task.title}

//       checked={false}
//       // checked={isCheckedTask(roleId, task.id.toString(), accessSettings)}
//     />

//     <span onClick={_showActionsList} className="text-muted" hidden={true}>показать действия</span>
//   </div>
// }

// function _allCheckboxOn(event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) {
//   event.currentTarget.parentElement
//     ?.querySelectorAll('input[type=checkbox]')
//     .forEach(elem => {
//       (elem as HTMLInputElement).checked = true;
//     })
// }

// function _getActionsList(roleId: string, taskId: string, actions: IRow[], accessSettings: IRole[]) {
//   return <div hidden={true} className={styles.actionsList}>

//     <p onClick={_allCheckboxOn} className="mb-2 text-muted">Выделить все</p>

//     {actions.map(action => _getAction(roleId, taskId, action, accessSettings))}
//   </div>
// }

// function _getAction(roleId: string, taskId: string, action: IRow, accessSettings: IRole[]) {
//   return <p key={roleId + taskId + action.id}>

//     <AccordionCheckbox
//       id={roleId + taskId + action.id}
//       name={`id_${roleId}[id_${taskId}][id_${action.id}]`}
//       title={action.title}

//       checked={false}
//       // checked={isCheckedAction(roleId, taskId, action.id.toString(), accessSettings)}
//     />
//   </p>
// }

// function isCheckedDirecting(roleId: string, directingId: string, accessSettings: IRole[]) {  
//   console.log(accessSettings)
// const role = accessSettings.find(e => e.id.toString() === roleId);
// if(!role) {
//   return false;
// }

// const directing = role.directings.find(e => e.id.toString() === directingId)
// if(!directing) {
//   return false;
// }
//   return true;
// }

// function isCheckedTask(roleId: string, directingId: string, taskId: string, accessSettings: IRole[]) {  
//   const role = accessSettings.find(e => e.id.toString() === roleId);
//   if(!role) {
//     return false;
//   }

//   const directing = role.directings.find(e => e.id.toString() === directingId)
//   if(!directing) {
//     return false;
//   }

//   const task = directing.tasks.find(e => e.id.toString() === taskId)
//   if(!task) {
//     return false;
//   }
//   return true;
// }

// function isCheckedAction(roleId: string, directingId: string, taskId: string, actionId: string, accessSettings: IRole[]) {

//   const role = accessSettings.find(e => e.id.toString() === roleId);
//   if(!role) {
//     return false;
//   }

//   const directing = role.directings.find(e => e.id.toString() === directingId)
//   if(!directing) {
//     return false;
//   }

//   const task = directing.tasks.find(e => e.id.toString() === taskId)
//   if(!task) {
//     return false;
//   }

//   const action = task.actions.find(e => e.id.toString() === actionId)
//   if(!action) {
//     return false;
//   }
//   return true;
// }





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
