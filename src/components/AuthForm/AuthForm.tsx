import React from "react";
import styles from "./styles.module.css"
import { useState } from "react";

import config from "../../config";
import { Email } from "./Email/Email";
import { LabelForgot } from "./LabelForgot/LabelForgot";
import { Password } from "./Password/Password";
import { YourName } from "./YourName/YourName";
import { Button } from "./Button/Button";
import { Footer } from "./Footer/Footer";

export const AuthForm = () => {
  const [formMode, setFormMode] = useState("signin");
  const [errorResponse, setErrorResponse] = useState<IErrorResponse | undefined>();

  return <form
    onSubmit={(event) => _query(event, formMode, setErrorResponse, setFormMode)}
    className={styles.root}>

    <Email errorMessage={errorResponse} />
    <LabelForgot formMode={formMode} setFormMode={setFormMode} />
    <Password formMode={formMode} errorMessage={errorResponse} />
    {/* <YourName formMode={formMode} jsonData={jsonData} />
    <Button formMode={formMode} />
    <Footer formMode={formMode} setFormMode={setFormMode} /> */}
  </form>
}

function _query(
  event: React.FormEvent<HTMLFormElement>,
  formMode: string,
  setErrorResponse: React.Dispatch<React.SetStateAction<IErrorResponse | undefined>>,
  setFormMode: React.Dispatch<React.SetStateAction<string>>) {

  event.preventDefault();

  fetch(`${config.auth.back.host}${config.auth.back.port ? ':' : ''}${config.auth.back.port}/api/mauth/${formMode}`, {
    method: formMode === "forgot" ? `PATCH` : `POST`,
    body: new FormData(event.currentTarget),
  }).then(async (req) => {
    if (req.ok) {
      setFormMode("signin");
      return;
    }
    else if (req.status === 400) {
      const res = await req.json();
      setErrorResponse(_getErrorResponse(res.error));
      return;
    }
    throw new Error(`response status: ${req.status}`)
  })
    .catch(error => console.log(error.message));
}

function _getErrorResponse(error: string): IErrorResponse {
  switch(error) {
    case "invalid email":
      return {field: "email", message: "Почта не корректна"}
    case "user not found":
      return {field: "email", message: "Пользователь не найден"}
    case "email is not unique":
      return {field: "email", message: "Пользователь c такой почтой уже создан"}
    default: return {field: "", message: ""}
  }

}