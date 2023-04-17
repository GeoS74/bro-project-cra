import { useState } from "react"
import classNames from "classnames";
import { ThemeContext } from "../../../contexts/ThemeContext/ThemeContext";
import styles from "./styles.module.css"

import EditForm from "../EditForm/EditForm"
import session from "../../../libs/token.manager"

type Props = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
  addDoc?: ((row: IDoc) => void) | undefined
}

export default function DocSelectType({ setShowForm, addDoc }: Props) {
  const [typeDoc, setTypeDoc] = useState<DocType>()

  if(typeDoc?.directing && typeDoc.task) {
    return <div className={classNames(styles.root, "mt-4")}>
      <EditForm setShowForm={setShowForm} addDoc={addDoc} typeDoc={typeDoc}/>
    </div>
  }

  return <div className={classNames(styles.root, "mt-4")}>
    <legend>Создание документа</legend>
    <p>{!typeDoc?.directing ? 'Выберите направление' : 'Выберите тип документа'}</p>

    {!typeDoc?.directing ? <ul>
      {session.getMe()?.roles[0].directings.map(e => {
        return <li key={e.id}
          onClick={() => setTypeDoc({ directing: e })}
        >{e.title}</li>
      })}
    </ul>
      : <></>}


    {typeDoc?.directing ? <ul>
      {typeDoc?.directing.tasks.map(e => {
        return <li key={e.id}
          onClick={() => setTypeDoc({ directing: typeDoc.directing, task: e })}
        >{e.title}</li>
      })}
    </ul>
      : <></>}
    <ThemeContext.Consumer>
      {({ theme }) => (
        <span className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'} mt-2`)} onClick={() => setShowForm(false)}>Отмена</span>
      )}
    </ThemeContext.Consumer>
    
  </div>
}