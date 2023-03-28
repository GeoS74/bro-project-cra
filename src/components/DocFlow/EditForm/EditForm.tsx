import { useState } from "react";

import SelectPane from "../SelectPane/SelectPane";
import session from "../../../libs/token.manager"
import styles from "./styles.module.css"

type Props = {
  setIdActiveDoc: React.Dispatch<React.SetStateAction<string>>
}

export default function EditForm({ setIdActiveDoc }: Props) {
  const [disabled, setDisabled] = useState(false)

  console.log(session.getMe()?.roles)

  return <form className={styles.root}>
    <fieldset disabled={disabled} className="form-group">

      <SelectPane />

      <input type="submit" className="btn btn-outline-light" value="Записать" />

      <span className="btn btn-outline-light" onClick={() => setIdActiveDoc('-1')}>Отмена</span>

    </fieldset>
  </form>
}
