import session from "../../../../libs/token.manager"
import tokenManager from "../../../../libs/token.manager"
import styles from "./styles.module.css"
import { ReactComponent as IconEdit } from "./icons/wrench.svg";
import { ReactComponent as IconDelete } from "./icons/trash.svg";
import fetchWrapper from "../../../../libs/fetch.wrapper";
import serviceHost from "../../../../libs/service.host";
import { responseNotIsArray } from "../../../../middleware/response.validator";
import { useNavigate } from "react-router-dom";


export default function OptionalHeader({ id, directing, task }: IDoc) {
  const navigate = useNavigate();

  return <div className={styles.root}>
    <div><small>{directing.title} / {task.title}</small></div>
    <div>
      {_checkUpdateAction(directing.id, task.id, 'Редактировать') ?
        <IconEdit className={styles.svg} 
        onClick={() => navigate(`/docflow/edit/doc/${id}`)}
        /> : <></>}

      {_checkUpdateAction(directing.id, task.id, 'Удалить') ?
        <IconDelete className={styles.svg}
          onClick={async () => {
            await _deleteDoc(id);
            navigate(-1);
          }} /> : <></>}
    </div>
  </div>
}

async function _deleteDoc(id: string) {
  if (!confirm('Удалить этот документ?')) {
    return;
  }

  return fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/docflow/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        return true;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => {
      console.log(error.message);
      return false;
    })
}

function _checkUpdateAction(idDirecting: number, idTask: number, action: string) {
  return session.getMe()?.roles[0]
    .directings.find(e => e.id === idDirecting)
    ?.tasks.find(e => e.id === idTask)
    ?.actions.find(e => e.title === action)
}