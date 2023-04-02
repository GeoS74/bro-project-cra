import { useState } from "react";
import { Link } from "react-router-dom";

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
  author?: IRow
  files?: IDocFile[]
}

export default function Doc({ id, title, description, directing, task, author, idActiveDoc, files, setIdActiveDoc, addDoc }: Props) {
  const [valueDoc, setValueDoc] = useState({id, title, description, directing, task, author, files});

  return <div className={classNames(styles.root, "mt-2")}>

    {id === idActiveDoc ?
      <EditForm setIdActiveDoc={setIdActiveDoc} setValueDoc={setValueDoc} addDoc={addDoc}/>
      : <>
        <h5><Link to={`/docflow/${id}`} className="nav-link">{valueDoc.title}</Link></h5>
         
        <p>{valueDoc.description}</p>
        
        <small>{valueDoc.directing?.title} / {valueDoc.task?.title}</small>
        <small>{author?.title}</small>
      </>
    }
  </div>
}