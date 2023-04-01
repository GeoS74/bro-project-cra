import { useState } from "react";

import session from "../../../libs/token.manager"
import tokenManager from "../../../libs/token.manager"
import serviceHost from "../../../libs/service.host"
import fetchWrapper from "../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../middleware/response.validator"
import SelectPane from "./SelectPane/SelectPane";
import TextPane from "./TextPane/TextPane";
import FilePane from "./FilePane/FilePane";
import styles from "./styles.module.css"

type Props = {
  setIdActiveDoc: React.Dispatch<React.SetStateAction<string>>
  setValueDoc: React.Dispatch<React.SetStateAction<{
    id: string;
    title: string | undefined;
    description: string | undefined;
    directing: IRow | undefined;
    task: IRow | undefined;
    author: IRow | undefined;
  }>>
  addDoc?: (row: IDoc) => void
}

export default function EditForm({ setIdActiveDoc, setValueDoc, addDoc }: Props) {
  const [disabled, setDisabled] = useState(false)
  const [errorMessage, setErrorResponse] = useState<IErrorDocMessage>();

  const [fileList, setFileList] = useState<FileList[]>([])

  return <form className={styles.root}
    onSubmit={event => _onSubmit(event, setDisabled, setIdActiveDoc, setValueDoc, setErrorResponse, fileList, addDoc)}
  >
    <fieldset disabled={disabled} className="form-group">
      <legend>{addDoc ? "Создание документа" : "Изменение документа"}</legend>

      <SelectPane errorMessage={errorMessage} mode={addDoc ? "create" : "update"} />

      <div>
        <label htmlFor="titleInput" className="form-label mt-1">Название документа</label>
        <input type="text" id="titleInput" name="title" className="form-control" placeholder="Введите название документа" />
      </div>


      <FilePane errorMessage={errorMessage}
        setFileList={(file: FileList) => setFileList([...fileList, file])} />

      <TextPane />

      <input type="submit" className="btn btn-outline-light" value="Записать" />

      <span className="btn btn-outline-light" onClick={() => setIdActiveDoc('-1')}>Отмена</span>

      <input type="hidden" name="author" defaultValue={session.getMe()?.email} />
    </fieldset>
  </form>
}

function _onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setIdActiveDoc: React.Dispatch<React.SetStateAction<string>>,
  setValueDoc: React.Dispatch<React.SetStateAction<{
    id: string;
    title: string | undefined;
    description: string | undefined;
    directing: IRow | undefined;
    task: IRow | undefined;
    author: IRow | undefined;
  }>>,
  setErrorResponse: React.Dispatch<React.SetStateAction<IErrorDocMessage | undefined>>,
  fileList: FileList[],
  addDoc?: (row: IDoc) => void
) {
  event.preventDefault();
  setDisabled(true);

  const fd = new FormData(event.currentTarget)

  fileList.map(f => fd.append('test[]', f[0]))

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
        setIdActiveDoc('-1')

        if (addDoc) {
          addDoc(res)
          return;
        }

        setValueDoc(res)
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