import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import tokenManager from "../../../classes/TokenManager";
import serviceHost from "../../../libs/service.host";
import fetchWrapper from "../../../libs/fetch.wrapper";
import { responseNotIsArray } from "../../../middleware/response.validator"
import styles from "./styles.module.css"
import classNames from "classnames";
import Accordion from "../Accordion/Accordion";
import Popup from "../../Popup/Popup";

export default function AccessSetting() {
  const [disabled, setDisabled] = useState(false);
  const [{ showPopup, modePopup }, setShowPopup] = useState<IPopup>({ showPopup: false});
  /*
  * первый элемент массива исходных данных - роли
  * второй - задачи / процессы
  * третий - действия
  * четвёртый - настройки прав доступа в виде объекта
  */
  const [roles, tasks, actions, accessSettings] = useLoaderData() as IAccessSetting[][];

  return <div className={styles.root}>
    <h3>Настройки прав доступа</h3>

    <form
      onSubmit={event => _updateAccessSetting(event, setDisabled, setShowPopup)}
      className={classNames(styles.content, "mt-4")}>

      <fieldset disabled={disabled}>
        <input
          type="submit"
          className="btn btn-outline-light mt-4 mb-4"
          value="Сохранить настройки"
        />

        <Accordion roles={roles} tasks={tasks} actions={actions} accessSettings={accessSettings} />

      </fieldset>
    </form>

    <Popup showPopup={showPopup} modePopup={modePopup} setShowPopup={setShowPopup} />
  </div>
}

function _updateAccessSetting(
  event: React.FormEvent<HTMLFormElement>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setShowPopup: React.Dispatch<React.SetStateAction<IPopup>>
) {

  event.preventDefault();
  setDisabled(true)

  fetchWrapper(() => fetch(`${serviceHost("informator")}/api/informator/setting/access`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: new FormData(event.currentTarget)
  }))
    .then(responseNotIsArray)
    .then(async (response) => {
      if (response.ok) {
        setShowPopup({ showPopup: true, modePopup: "success" })
        return;
      }

      throw new Error(`response status: ${response.status}`)
    })
    // .then(() => <h1>dfs</h1>)
    .catch(error => console.log(error.message))
    .finally(() => setDisabled(false));
}