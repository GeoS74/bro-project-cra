import { useState } from "react"
import classNames from "classnames";
import { ThemeContext } from "../../../contexts/ThemeContext/ThemeContext";

import tokenManager from "../../../libs/token.manager"
import serviceHost from "../../../libs/service.host"
import fetchWrapper from "../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../middleware/response.validator"

type Props = {
  setDocs: (newDocs: IDoc[]) => void
  lastId: string
  limit:number
  showNextButton: boolean
  setShowNextButton: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NextSearch({ setDocs, lastId, limit, showNextButton, setShowNextButton }: Props) {
  const [disabled, setDisabled] = useState(false)

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <button
        hidden={!showNextButton}
        disabled={disabled}
        onClick={() => onSubmit(lastId, limit, setDisabled, setDocs, setShowNextButton)}
        type="button" className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'} mt-4`)}>Загрузить ещё</button>
      )}
    </ThemeContext.Consumer>
)}

async function onSubmit(
  lastId: string,
  limit: number,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setDocs: (newDocs: IDoc[]) => void,
  setShowNextButton: React.Dispatch<React.SetStateAction<boolean>>
) {

  setDisabled(true)

  const query = sessionStorage.getItem('lastQuery') || "";

  fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/docflow/search/doc/?title=${query}&limit=${limit}&last=${lastId}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.json()
        setDocs(res)

        if(!res.length){
          setShowNextButton(false)
        }
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
    .finally(() => setDisabled(false));

}
