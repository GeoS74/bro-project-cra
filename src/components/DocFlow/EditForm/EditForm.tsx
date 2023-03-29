import { useState } from "react";

import tokenManager from "../../../libs/token.manager"
import serviceHost from "../../../libs/service.host"
import fetchWrapper from "../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../middleware/response.validator"
import SelectPane from "../SelectPane/SelectPane";
import TextPane from "../TextPane/TextPane";
import styles from "./styles.module.css"

type Props = {
  setIdActiveDoc: React.Dispatch<React.SetStateAction<string>>
  setValueDoc: React.Dispatch<React.SetStateAction<{
    id: string;
    title: string | undefined;
    description: string | undefined;
    directing: IRow | undefined;
    task: IRow | undefined;
}>>
  addDoc?: (row: IDoc) => void
}

export default function EditForm({ setIdActiveDoc, setValueDoc, addDoc }: Props) {
  const [disabled, setDisabled] = useState(false)
  const [errorMessage, setErrorResponse] = useState<IErrorDocMessage>();

  return <form className={styles.root}
    onSubmit={event => _onSubmit(event, setDisabled, setIdActiveDoc, setValueDoc, setErrorResponse, addDoc)}
  >
    <fieldset disabled={disabled} className="form-group">
      <legend>{addDoc ? "Создание документа" : "Изменение документа"}</legend>

      <SelectPane errorMessage={errorMessage} mode={addDoc ? "create" : "update"} />

      <TextPane errorMessage={errorMessage} />

      <input type="submit" className="btn btn-outline-light" value="Записать" />

      <span className="btn btn-outline-light" onClick={() => setIdActiveDoc('-1')}>Отмена</span>

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
  }>>,
  setErrorResponse: React.Dispatch<React.SetStateAction<IErrorDocMessage | undefined>>,
  addDoc?: (row: IDoc) => void
) {
  event.preventDefault();
  setDisabled(true);

  const fd = new FormData(event.currentTarget)

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