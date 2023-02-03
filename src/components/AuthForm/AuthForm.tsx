import { useState } from "react";

import config from "../../config";
import { Email } from "./Email/Email";
import { Password } from "./Password/Password";
import { YourName } from "./YourName/YourName";
import { Button } from "./Button/Button";
import { Footer } from "./Footer/Footer";
import styles from "./styles.module.css"

export const AuthForm = () => {
  const [formMode, setFormMode] = useState<formMode>("signin");
  const [errorMessage, setErrorResponse] = useState<IErrorAuthMessage | undefined>();



  return <div className={styles.root}>
    <form onSubmit={(event) => _query(event, formMode, setFormMode, setErrorResponse)}>
      Authorization form
      <Email errorMessage={errorMessage} />

      <Password formMode={formMode} setFormMode={setFormMode} errorMessage={errorMessage} />

      {/* <YourName formMode={formMode} errorMessage={errorMessage} /> */}

      <Button formMode={formMode} />

      <Footer formMode={formMode} setFormMode={setFormMode} />
    </form>
  </div>
}

function _query(
  event: React.FormEvent<HTMLFormElement>,
  formMode: string,
  setFormMode: React.Dispatch<React.SetStateAction<formMode>>,
  setErrorResponse: React.Dispatch<React.SetStateAction<IErrorAuthMessage | undefined>>) {

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

function _getErrorResponse(error: string): IErrorAuthMessage {
  switch (error) {
    case "invalid email":
      return { field: "email", message: "Введите адрес электронной почты" }
    case "user not found":
      return { field: "email", message: "Пользователь не найден" }
    case "email is not unique":
      return { field: "email", message: "Пользователь c такой почтой уже создан" }
    case "invalid password":
      return { field: "password", message: "Пароль не корректен" }
    case "incorrect name":
      return { field: "name", message: "Имя заполнено не корректно" }
    default: return { field: "", message: "" }
  }
}