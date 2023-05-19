import { useNavigate, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

import session from "../../../libs/token.manager"
import tokenManager from "../../../libs/token.manager"
import { responseNotIsArray } from "../../../middleware/response.validator";
import fetchWrapper from "../../../libs/fetch.wrapper";
import serviceHost from "../../../libs/service.host";
import EditForm from "../EditForm/EditForm";
import styles from "./styles.module.css"
import classNames from "classnames";
import BackArrow from "../BackArrow/BackArrow";
import { Converter } from "md-conv";
import {ReactComponent as IconCreate} from "./image/create.svg"
import {ReactComponent as IconEdit} from "./image/edit.svg"
import {ReactComponent as IconYes} from "./image/yes.svg"
import {ReactComponent as IconNo} from "./image/no.svg"

const converter = new Converter()

export default function DocPage() {
  session.subscribe('doc');
  const navigate = useNavigate();
  const [doc, setDoc] = useState(useLoaderData() as IDoc);
  const [showForm, setShowForm] = useState(false);
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme

  if (showForm) {
    const typeDoc: DocType = {
      directing: doc.directing as IDirecting,
      task: doc.task as ITask
    }

    return <div className={styles.root}>
      <EditForm setShowForm={setShowForm} updDoc={setDoc} doc={doc} typeDoc={typeDoc} />
    </div>
  }

  return  <div className={styles.root}>
    <div className={styles.linkAndTitle}>
      <BackArrow />
      <small>{doc.directing?.title} / {doc.task?.title}</small>      
    </div>

    <h3 className="mt-2">{doc.title}</h3>

    {doc.acceptor.length ? <p className="mt-4">Подписанты:</p> : <></>}

    <ul>
      {doc.acceptor.map(user => {
        return <li key={user.uid}>
          <span>{user.name}</span>
          {user.accept ? <IconYes height="15px" width="15px" className={styles.svgButton}/> : <IconNo height="15px" width="15px" className={styles.svgButton}/>}
        </li>
      })}
    </ul>

    {doc.recipient.length ? <p className="mt-4">Подписанты:</p> : <></>}

    <ul>
      {doc.recipient.map(user => {
        return <li key={user.uid}>
          <span>{user.name}</span>
          {user.accept ? <IconYes height="15px" width="15px" className={styles.svgButton}/> : <IconNo height="15px" width="15px" className={styles.svgButton}/>}
        </li>
      })}
    </ul>

    {doc.files.length ? <p className="mt-4">Прикреплённые файлы:</p> : <></>}

    <ul>
      {doc.files.map(file => {
        return <li key={file.fileName + doc.id}>
          <a
            className="text-muted"
            href={`${serviceHost('informator')}/api/informator/docflow/scan/${file.fileName}`}
            download={true}
          >{file.originalName}</a>
        </li>
      })}
    </ul>

    <p
      className="mt-2"
      dangerouslySetInnerHTML={{ __html: converter.markdownToHTML(doc.description) }}
    ></p>

    <div className={styles.buttons}>
      {_checkUpdateAction(doc.directing.id, doc.task.id, 'Редактировать') ?
            <div
              className={classNames(styles.button)}
              onClick={() => setShowForm(true)}>
              <IconEdit height="70px" width="70px" className={styles.svgButton}/>
              <div>
                Редактировать документ
              </div>
                           
            </div>
        : <></>}

      {_checkUpdateAction(doc.directing.id, doc.task.id, 'Удалить') ?
              <div className={classNames(styles.button)}
              onClick={() => {
                _delDoc(doc.id);
                navigate('/docflow');
              }}>
                <IconCreate height="50px" width="50px" className={styles.svgButton}/>
                <div>Удалить</div>                
              </div>            
        : <></>}
    </div>
  </div>
}


function _checkUpdateAction(idDirecting: number, idTask: number, action: string) {
  return session.getMe()?.roles[0]
    .directings.find(e => e.id === idDirecting)
    ?.tasks.find(e => e.id === idTask)
    ?.actions.find(e => e.title === action)
}

function _delDoc(id: string) {
  if (!confirm('Удалить этот документ?')) {
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
    .catch(error => console.log(error.message))
  // .finally(() => navigate('/docflow'))
}