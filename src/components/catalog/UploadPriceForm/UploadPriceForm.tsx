import config from "../../../config";
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

  fetch(`${config.catalog.back.host || ''}${config.catalog.back.port ? ':' : ''}${config.catalog.back.port || ''}/api/bridge/file/upload`, {
    method: 'POST',
    body: new FormData(event.target as HTMLFormElement)
  })
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
