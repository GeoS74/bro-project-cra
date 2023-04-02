import { useState } from "react";

import session from "../../../libs/token.manager"
import tokenManager from "../../../libs/token.manager"
import serviceHost from "../../../libs/service.host"
import fetchWrapper from "../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../middleware/response.validator"
import SelectPane from "./SelectPane/SelectPane";
import TextPane from "./TextPane/TextPane";
import TitleDoc from "./TitleDoc/TitleDoc";
import FileInput from "./FileInput/FileInput";
import FileNameList from "./FileNameList/FileNameList"
import classNames from "classnames"
import styles from "./styles.module.css"

type Props = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
  addDoc?: (row: IDoc) => void
}

export default function EditForm({ setShowForm, addDoc }: Props) {
  const [disabled, setDisabled] = useState(false)
  const [errorMessage, setErrorResponse] = useState<IErrorDocMessage>();

  const [fileList, setFileList] = useState<FileList[]>([])

  return <div className={classNames(styles.root, "mt-2")}>
    <form
      onSubmit={event => _onSubmit(event, setDisabled, setShowForm, setErrorResponse, fileList, addDoc)}
    >
      <fieldset disabled={disabled} className="form-group">
        <legend>{addDoc ? "Создание документа" : "Изменение документа"}</legend>

        <SelectPane errorMessage={errorMessage} mode={addDoc ? "create" : "update"} />

        <TitleDoc errorMessage={errorMessage} />

        <FileNameList fileList={fileList} setFileList={setFileList} />

        <FileInput errorMessage={errorMessage}
          setFileList={(file: FileList) => setFileList([...fileList, file])} />

        <TextPane />

        <input type="submit" className="btn btn-outline-light" value="Записать" />

        <span className="btn btn-outline-light" onClick={() => setShowForm(false)}>Отмена</span>

        <input type="hidden" name="author" defaultValue={session.getMe()?.email} />
      </fieldset>
    </form>
  </div>
}

function _onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorResponse: React.Dispatch<React.SetStateAction<IErrorDocMessage | undefined>>,
  fileList: FileList[],
  addDoc?: (row: IDoc) => void
) {
  event.preventDefault();
  setDisabled(true);

  const fd = new FormData(event.currentTarget)

  fileList.map(f => fd.append('scans', f[0]))

  fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/docflow`, {
    method: addDoc ? 'POST' : 'PATCH',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.json()
        setShowForm(false)

        if (addDoc) {
          addDoc(res)
          return;
        }

        // setValueDoc(res)
        return;
      }
      else if (response.status === 400) {
        const res = await response.json()
        setErrorResponse(_getErrorResponse(res.error))
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
    .finally(() => setDisabled(false));
}

function _getErrorResponse(error: string): IErrorDocMessage {
  console.log(error)
  switch (error) {
    case "invalid title":
      return { field: "title", message: "Введите название документа" }
    case "invalid directing id":
      return { field: "directSelect", message: "Не выбрано направление" }
    case "invalid task id":
      return { field: "taskSelect", message: "Не выбран тип документа" }
    default: return { field: "", message: "" }
  }
}