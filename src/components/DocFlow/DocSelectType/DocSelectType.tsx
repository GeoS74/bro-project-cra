import { useState } from "react"
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom"
  
import session from "../../../libs/token.manager"
import styles from "./styles.module.css"
import classNames from "classnames"
import EditForm from "../EditForm/EditForm"

type Props = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
  addDoc?: ((row: IDoc) => void) | undefined
}

export default function DocSelectType() {
  const setShowForm = useLocation();
  const addDoc = useLocation().state?.addDoc;
  console.log(setShowForm)
  // console.log(addDoc)
  const [typeDoc, setTypeDoc] = useState<DocType>()
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme
  
  return <div>1</div>
  
  // if(typeDoc?.directing && typeDoc.task) {
  //   return <div className={classNames(styles.root, "mt-4")}>
  //     <EditForm setShowForm={setShowForm} addDoc={addDoc} typeDoc={typeDoc}/>
  //   </div>
  // }
  

  // return <div className={classNames(styles.root, "mt-4")}>
  //   <legend>Создание документа</legend>
  //   <p>{!typeDoc?.directing ? 'Выберите направление' : 'Выберите тип документа'}</p>

  //   {!typeDoc?.directing ? <ul>
  //     {session.getMe()?.roles[0].directings.map(e => {
  //       return <li key={e.id}
  //         onClick={() => setTypeDoc({ directing: e })}
  //       >{e.title}</li>
  //     })}
  //   </ul>
  //     : <></>}


  //   {typeDoc?.directing ? <ul>
  //     {typeDoc?.directing.tasks.map(e => {
  //       return <li key={e.id}
  //         onClick={() => setTypeDoc({ directing: typeDoc.directing, task: e })}
  //       >{e.title}</li>
  //     })}
  //   </ul>
  //     : <></>}

  //   <span className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'} mt-2`)}onClick={() => setShowForm(false)}>Отмена</span>
  // </div>
}