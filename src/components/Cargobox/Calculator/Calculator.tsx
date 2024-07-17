import { useState } from "react";
import City from "./City/City"
import styles from "./styles.module.css"
import classNames from "classnames";
import { useSelector } from "react-redux";

export default function Calculator() {
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme
  return <div className={styles.root}>
    <form onSubmit={(event) => _onSubmit(event)}>
      <legend className="mt-3 mb-4">Расчёт стоимости доставки грузов</legend>

      <City fieldName="arrival"/>
      {/* <City fieldName="derrival"/> */}

      <input type="submit" value="Рассчитать доставку" className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'} mt-4`)} />
    </form>
  </div>
}

function _onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  // setError: React.Dispatch<React.SetStateAction<string | undefined>>,
  // setUploadState: React.Dispatch<React.SetStateAction<string>>
  ) {

  event.preventDefault()
  // setUploadState("upload");

  // fetchWrapper(() => _uploadPrice(event))
  //   .then(responseNotIsArray)
  //   .then(async response => {
  //     if (response.ok) {
  //       setError(undefined);
  //       const res = await response.json()
  //       console.log(res)
  //       setUploadState("end");
  //       return;
  //     }
  //     else if ([400, 404].includes(response.status)) {
  //       const res = await response.json()
  //       setError(res.error)
  //       return
  //     }
  //     throw new Error(`response status: ${response.status}`)
  //   })
  //   .catch(error => {
  //     setError("файл не загружен");
  //     console.log(error.message)
  //   })
}
