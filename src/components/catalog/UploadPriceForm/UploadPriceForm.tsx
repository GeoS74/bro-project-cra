import tokenManager from "../../../classes/TokenManager"
import serviceHost from "../../../libs/service.host"
import fetchWrapper from "../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../middleware/response.validator"
import { UploadPriceFormTabPane } from "../UploadPriceFormTabPane/UploadPriceFormTabPane";

type Props = {
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
  setUploadState: React.Dispatch<React.SetStateAction<string>>,
}

export default function UploadPriceForm({ setError, setUploadState }: Props) {
  return <form onSubmit={(event) => _onSubmit(event, setError, setUploadState)}>

    <legend className="mt-3 mb-4">Настройки загрузки файла Excel</legend>

    <UploadPriceFormTabPane />

    <input type="submit" value="Загрузить прайс" className="btn btn-outline-light mt-4" />
  </form>
}

function _onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
  setUploadState: React.Dispatch<React.SetStateAction<string>>) {

  event.preventDefault()
  setUploadState("upload");

  fetchWrapper(() => _uploadPrice(event))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        setError(undefined);
        const res = await response.json()
        console.log(res)
        setUploadState("end");
        return;
      }
      else if ([400, 404].includes(response.status)) {
        const res = await response.json()
        setError(res.error)
        return
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => {
      setError("файл не загружен");
      console.log(error.message)
    })
}

function _uploadPrice(event: React.FormEvent<HTMLFormElement>) {
  return fetch(`${serviceHost("bridge")}/api/bridge/file/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: new FormData(event.target as HTMLFormElement)
  })
}
