import tokenManager from "../../../../../libs/token.manager"
import serviceHost from "../../../../../libs/service.host"
import fetchWrapper from "../../../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../../../middleware/response.validator"

type Props = {
  setSignSearchList: React.Dispatch<React.SetStateAction<IDocSignatory[]>>
  typeDoc: DocType
}

export default function SignatorySearchInput({setSignSearchList, typeDoc}: Props) {
  return <>
    <label htmlFor="signatoryInput" className="form-label mt-1">Подписывает</label>
    <input
      autoComplete="off"
      type="text"
      id="signatoryInput"
      className="form-control"
      placeholder="введите Ф.И.О. или должность"
      onKeyUp={(event) => {
        _searchUser(event.currentTarget.value, setSignSearchList, typeDoc)
      }}
    // onBlur={() => setSignSearchList(undefined)}
    />
  </>
}


function _searchUser(
  value: string,
  setSignSearchList: React.Dispatch<React.SetStateAction<IDocSignatory[]>>,
  typeDoc: DocType,
) {
  if (!value) {
    return setSignSearchList([])
  }
  fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/user/search/?search=${value}&directing=${typeDoc.directing.id}&task=${typeDoc.task?.id}&limit=5&acceptor=1`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.json();
        setSignSearchList(res)
        return
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message));
}