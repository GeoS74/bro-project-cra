import { useNavigate, useLoaderData, useLocation } from "react-router-dom";
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
import OptionalHeader from "./OptionalHeader/OptionalHeader";
import {ReactComponent as IconCreate} from "./image/create.svg"
import {ReactComponent as IconEdit} from "./image/edit.svg"
import {ReactComponent as IconYes} from "./image/yes.svg"
import {ReactComponent as IconNo} from "./image/no.svg"


type propsAcceptor = {
  accept: string | boolean,
  email: string,
  fullName: string,
  name: string,
  uid: string,
}

const converter = new Converter()

export default function DocPage() {
  session.subscribe('DocPage');
  const navigate = useNavigate();
  const [doc, setDoc] = useState(useLoaderData() as IDoc);
  const [showForm, setShowForm] = useState(false);
  const path = useLocation().state;
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme

  if (showForm) {
    const typeDoc: DocType = {
      directing: doc.directing as IDirecting,
      task: doc.task as ITask
    }

    return <div className={styles.root}>
      <EditForm updDoc={setDoc} doc={doc} typeDoc={typeDoc} />
    </div>
  }

  return  <div className={styles.root}>

    <OptionalHeader {...doc}/>

    {/* <div className={styles.linkAndTitle}>
      <BackArrow />
      <small>{doc.directing.title} / {doc.task.title}</small>      
    </div> */}

    <h3 className="mt-4">{doc.title}</h3>

    <div className="mt-4"
      dangerouslySetInnerHTML={{ __html: converter.markdownToHTML(doc.description) }}
    ></div>







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

    

    {path === "/docflow/listMeTasks" 
    ? <div className={styles.buttons}>
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
  : <></>
  }

{path === "/docflow/listOtherTasks" 
    ? <div className={styles.buttons}>
    {_checkUpdateAction(doc.directing.id, doc.task.id, 'Редактировать') ?
          <div
            className={classNames(styles.button)}
            onClick={() => {
              _acceptDoc(doc);
              // navigate('/docflow');
            }}>
            <IconEdit height="70px" width="70px" className={styles.svgButton}/>
            <div>
              Согласовать документ
            </div>
                         
          </div>
      : <></>}

    {_checkUpdateAction(doc.directing.id, doc.task.id, 'Удалить') ?
            <div className={classNames(styles.button)}
            onClick={() => {
              _recipientDoc(doc);
              // navigate('/docflow');
            }}>
              <IconCreate height="50px" width="50px" className={styles.svgButton}/>
              <div>Ознакомлен</div>                
            </div>            
      : <></>}
  </div>
  : <></>
  }
    
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

function _acceptDoc (doc: IDoc) {
  const tempDoc = doc
  doc.acceptor.map((acceptor, index) => {
    if(session.getMe()?.email === acceptor.email) {
      tempDoc.acceptor[index].accept = true
    }
  })
  const foo = JSON.stringify(tempDoc)

  fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/docflow/${doc.id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: foo
  })).catch(error => console.log(error.message))
}

function _recipientDoc (doc: IDoc) {
  const tempDoc = doc
  doc.recipient.map((recipient, index) => {
    if(session.getMe()?.email === recipient.email) {
      tempDoc.recipient[index].accept = true
    }
  })

  const fd = new FormData();

  // Object.entries(tempDoc).map(([key, value]) => console.log(`${key}: ${typeof value}`) )
  Object.entries(tempDoc).map(([key, value]) => {
    if (typeof value === "object") {
      if (key === "directing") {
        fd.append(`directingId`, `${value.id}`)
      }
      if (key === "task") {
        fd.append(`taskId`, `${value.id}`)
      }
      if (key === "author") {
        fd.append(`author`, `${value.uid}`)
      }
      if (key === "acceptor") {
        value.map((e: propsAcceptor) => {
          if (e.accept === false) {
            fd.append(`acceptor[${e.uid}]`, '')
          } else {fd.append(`acceptor[${e.uid}]`, 'true')}          
        })
      }
      
    } else {
      console.log(2)
      fd.append(`${key}`, `${value}`)
    }
  })


  fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/docflow/${doc.id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  })).catch(error => console.log(error.message))
}