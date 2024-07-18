import { useSelector } from "react-redux";
import classNames from "classnames";
import City from "./City/City"
import AccordionBox from "./AccordionBox/AccordionBox";
import styles from "./styles.module.css"
import { useState } from "react";
import serviceHost from "../../../libs/service.host";

export default function Calculator() {
  const theme = (useSelector((state) => state) as { theme: { theme: string } }).theme.theme;

  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setError] = useState<IErrorMessage>();

  return <form className={styles.root} onSubmit={(event) => _onSubmit(event, setDisabled, setError)}>

    <fieldset disabled={disabled} className="form-group">
      <legend className="mt-3">Расчёт стоимости доставки грузов</legend>

      <City fieldName="derival" labelValue="откуда" setError={setError} errorMessage={errorMessage}/>
      <City fieldName="arrival" labelValue="куда" setError={setError} errorMessage={errorMessage}/>

      <hr />

      <AccordionBox />

      <input type="submit" value="Рассчитать доставку" className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'} mt-4`)} />
    </fieldset>
  </form>
}

function _onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<IErrorMessage | undefined>>
) {

  event.preventDefault();
  setDisabled(true);

  const fd = new FormData(event.currentTarget);

  fetch(`${serviceHost("cargobox")}/api/cargobox/calculate`, {
    method: 'POST',
    body: fd
  })
    .then(async response => {
      if (response.ok) {
        const res = await response.json();
        // console.log(res)
        return;
      } 
      else if (response.status === 400) {
        const res = await response.json()
        setError(_getErrorResponse(res.error))
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
    .finally(() => setDisabled(false));
}

function _getErrorResponse(error: string): IErrorMessage {
  switch (error) {
    case "derival not found":
      return { field: "derival", message: "Не выбран пункт отправки" }
    case "arrival not found":
      return { field: "arrival", message: "Не выбран пункт назначения" }
    default: return { field: "", message: "" }
  }
}
