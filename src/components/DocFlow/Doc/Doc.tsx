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

export default function Doc({ id, description, idActiveDoc, setIdActiveDoc, title }: Props) {
  return <div className={classNames(styles.root, "mt-2")}>

    {id === idActiveDoc ?
      <EditForm setIdActiveDoc={setIdActiveDoc}/>
      : <>
        <h5>{title}</h5>
        <p>{description}</p>
      </>
    }

  </div>
}