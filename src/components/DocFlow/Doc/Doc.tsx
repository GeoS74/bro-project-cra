import { useState } from "react";

import EditForm from "../EditForm/EditForm"
import classNames from "classnames"
import styles from "./styles.module.css"

type Props = {
  id: string
  idActiveDoc: string
  setIdActiveDoc: React.Dispatch<React.SetStateAction<string>>
  addDoc?: (newDoc: IDoc) => void
  title?: string
  description?: string
  directing?: IRow
  task?: IRow
}

export default function Doc({ id, title, description, directing, task, idActiveDoc, setIdActiveDoc, addDoc }: Props) {
  const [valueDoc, setValueDoc] = useState({id, title, description, directing, task});

  return <div className={classNames(styles.root, "mt-2")}>

    {id === idActiveDoc ?
      <EditForm setIdActiveDoc={setIdActiveDoc} setValueDoc={setValueDoc} addDoc={addDoc}/>
      : <>
        <h5>{valueDoc.title}</h5>
        <p>{valueDoc.description}</p>
        
        <small>{valueDoc.directing?.title} / {valueDoc.task?.title}</small>
      </>
    }
  </div>
}