import tokenManager from "../../../classes/TokenManager"
import serviceHost from "../../../libs/service.host"
import EditButton from "../EditButton/EditButton";
import styles from "./styles.module.css"

type Props = {
  about: IAbout | undefined
  setAbout: React.Dispatch<React.SetStateAction<IAbout | undefined>>
  editMode: boolean
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditForm({ about, setAbout, editMode, setEditMode }: Props) {
  return <form
    onSubmit={(event) => { _onSubmit(event, setEditMode, about, setAbout) }}
    className={styles.root}>

    <EditButton editMode={editMode} />

    <div className="form-group">
      <label className="form-label mt-4">Редактировать  страницу (markdown)</label>
      <textarea className="form-control" name="mdInfo" defaultValue={about?.mdInfo || ""}></textarea>
      <input type="hidden" name="alias" defaultValue="company" />
    </div>
  </form>
}

async function _onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
  about: IAbout | undefined,
  setAbout: React.Dispatch<React.SetStateAction<IAbout | undefined>>
) {

  event.preventDefault()
  setEditMode(false)

  try {
    await _query(setAbout, new FormData(event.target as HTMLFormElement), about?.alias)
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "401") {
      try {
        await tokenManager.refreshTokens()
        await _query(setAbout, new FormData(event.target as HTMLFormElement), about?.alias)
      }
      catch (e) {/**/ }
    }
  }


  // fetch(`${serviceHost("informator")}/api/informator/about/${about?.alias || ""}`, {
  //   method: about?.alias ? 'PATCH' : 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${tokenManager.getAccess()}`
  //   },
  //   body: new FormData(event.target as HTMLFormElement)
  // })
  //   .then(async response => {
  //     if (response.ok) {
  //       const res = await response.json()
  //       setAbout(res)
  //       return;
  //     }
  //     // else if (response.status === 400) {
  //     //   // const res = await response.json()
  //     //   return;
  //     // }
  //     throw new Error(`response status: ${response.status}`)
  //   })
  //   .catch(error => console.log(error.message))
  //   .finally(() => setEditMode(false));
}





function _query(
  setAbout: React.Dispatch<React.SetStateAction<IAbout | undefined>>,
  fd: FormData,
  alias: string | undefined
) {

  return fetch(`${serviceHost("informator")}/api/informator/about/${alias || ""}`, {
    method: alias ? 'PATCH' : 'POST',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  })
    .then(async response => {
      if (response.ok) {
        const res = await response.json()
        setAbout(res)
        return;
      }

      if ([400, 404].includes(response.status)) {
        setAbout(undefined)
        return;
      }

      if (response.status === 401) {
        throw new Error("401")
      }
      throw new Error(`response status: ${response.status}`)
    })
}