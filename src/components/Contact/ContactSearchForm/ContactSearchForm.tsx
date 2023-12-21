import { useState } from "react"
import { useSelector } from "react-redux";

import tokenManager from "../../../libs/token.manager"
import serviceHost from "../../../libs/service.host"
import fetchWrapper from "../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../middleware/response.validator";
import classNames from "classnames";
import styles from "./styles.module.css"

type Props = {
  setContacts: React.Dispatch<React.SetStateAction<IContact[]>>
}

export default function ContactSearchForm({setContacts}: Props) {
  const [disabled, setDisabled] = useState(false)
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme

  const defaultValue = new URL(location.href).searchParams.get('query') || "";

  return <form id="searchForm" className={styles.root}
    onSubmit={(event) => {
      _onSubmit(event, setDisabled, setContacts)
    }}>
    
    <fieldset disabled={disabled}>
      <input type="search" name="search" className="form-control" placeholder="Поиск контактов..." defaultValue={defaultValue}/>

      <input type="submit" className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`)} value="Поиск" />
    </fieldset>
  </form>
}

async function _onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setContacts: React.Dispatch<React.SetStateAction<IContact[]>>
  ) {

  event.preventDefault()

  const fd = new FormData(event.target as HTMLFormElement)

  setDisabled(true)

  fetchWrapper(() => fetch(`${serviceHost('signum')}/api/contact/?search=${fd.get('search')}`, {
  headers: {
    'Authorization': `Bearer ${tokenManager.getAccess()}`
  },
}))
  .then(responseNotIsArray)
  .then(async response => {
    if (response.ok) {
      const res = await response.json()
      setContacts(res)
      return;
    }
    throw new Error(`response status: ${response.status}`)
  })
  .catch(error => console.log(error.message))
  .finally(() => setDisabled(false));
}
