import { useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

import session from "../../../libs/token.manager"
import tokenManager from "../../../libs/token.manager"
import { responseNotIsArray } from "../../../middleware/response.validator";
import fetchWrapper from "../../../libs/fetch.wrapper";
import serviceHost from "../../../libs/service.host";
import EditForm from "../EditForm/EditForm";
import styles from "./styles.module.css"

export default function DocPage() {
  session.subscribe('doc');
  const navigate = useNavigate();
  const [doc, setDoc] = useState(useLoaderData() as IDoc);
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return <div className={styles.root}>
      <EditForm setShowForm={setShowForm} updDoc={setDoc} />
    </div>
  }

  return <div className={styles.root}>
    <h3 className="mb-4">{doc.title}</h3>

    <small>{doc.directing?.title} / {doc.task?.title}</small>
    <p className="mt-2">{doc.description}</p>

    {_checkUpdateAction(doc.directing.id, doc.task.id, 'Редактировать') ?
      <button type="button"
        className="btn btn-outline-light mt-4 mb-4"
        onClick={() => setShowForm(true)}
      >Редактировать документ</button>
      : <></>}

    {_checkUpdateAction(doc.directing.id, doc.task.id, 'Удалить') ?
      <button type="button"
        className="btn btn-outline-light mt-4 mb-4"
        onClick={() => {
          _delDoc(doc.id);
          navigate('/docflow');
        }}
      >Удалить документ</button>
      : <></>}
  </div>
}

function _checkUpdateAction(idDirecting: number, idTask: number, action: string) {
  return session.getMe()?.roles[0]
    .directings.find(e => e.id === idDirecting)
    ?.tasks.find(e => e.id === idTask)
    ?.actions.find(e => e.title === action)
}

function _delDoc(id: string) {
  if(!confirm('Удалить этот документ?')) {
    return;
  }
  fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/docflow/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message));
}