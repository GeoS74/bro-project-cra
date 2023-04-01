import classNames from "classnames"
import { ErrorMessage } from "../ErrorMessage/ErrorMessage"

import addDescIcon from "./image/addDescIcon.svg"
import styles from "./styles.module.css"

type Props = {
  errorMessage: IErrorDocMessage | undefined
}

export default function TextPane({ errorMessage }: Props) {
  return <div className={classNames("form-group mb-4", styles.root)}>

    <div>
      <label htmlFor="titleInput" className="form-label mt-1">Название документа</label>
      <input type="text" id="titleInput" name="title" className="form-control" placeholder="Введите название документа" />
      {errorMessage?.field === "title" ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
    </div>

    <p className="mt-4" onClick={_showTextarea}>
    <img src={addDescIcon} loading="lazy"/>
      <small>Добавить пояснительную записку</small></p>

    <div hidden>
      <label htmlFor="descTextarea" className="form-label mt-4">Пояснительная записка</label>
      <textarea className="form-control" id="descTextarea" name="description"></textarea>
    </div>
  </div>
}

function _showTextarea(event: React.MouseEvent<HTMLElement, MouseEvent>) {
  const textarea = event.currentTarget.nextElementSibling as HTMLDivElement
  textarea.hidden = !textarea.hidden;

  event.currentTarget.remove();
}