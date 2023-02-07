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
  const [disabled, setDisabled] = useState(false)


  return <div className={styles.root}>
    <form onSubmit={(event) => _query(event, formMode, setFormMode, setErrorResponse, setDisabled)}>

      <legend>{_getLegend(formMode)}</legend>

      <fieldset disabled={disabled}>
        <Email errorMessage={errorMessage} />

        <Password formMode={formMode} setFormMode={setFormMode} errorMessage={errorMessage} />

        <YourName formMode={formMode} errorMessage={errorMessage} />

        <Button formMode={formMode} />

        <Footer formMode={formMode} setFormMode={setFormMode} />
      </fieldset>
    </form>
  </div>
}

function _query(
  event: React.FormEvent<HTMLFormElement>,
  formMode: formMode,
  setFormMode: React.Dispatch<React.SetStateAction<formMode>>,
  setErrorResponse: React.Dispatch<React.SetStateAction<IErrorAuthMessage | undefined>>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>) {

  event.preventDefault();
  setDisabled(true)

  fetch(`${config.auth.back.host || ''}${config.auth.back.port ? ':' : ''}${config.auth.back.port || ''}/api/mauth/${formMode}`, {
    method: formMode === "forgot" ? `PATCH` : `POST`,
    body: new FormData(event.currentTarget),
  }).then(async (req) => {
    if (req.ok) {
      setFormMode("signin");
      setErrorResponse(undefined);
      return;
    }
    else if (req.status === 400) {
      const res = await req.json();
      setErrorResponse(_getErrorResponse(res.error));
      return;
    }
    throw new Error(`response status: ${req.status}`)
  })
    .catch(error => console.log(error.message))
    .finally(() => setDisabled(false));
}

function _getErrorResponse(error: string): IErrorAuthMessage {
  switch (error) {
    case "invalid email":
      return { field: "email", message: "Введите адрес электронной почты" }
    case "user not found":
      return { field: "email", message: "Пользователь не найден" }
    case "email not confirmed":
      return { field: "email", message: "email не подтверждён. Проверьте почту" }
    case "email is not unique":
      return { field: "email", message: "Пользователь c такой почтой уже создан" }
    case "invalid password":
      return { field: "password", message: "Пароль не корректен" }
    case "incorrect name":
      return { field: "name", message: "Имя заполнено не корректно" }
    default: return { field: "", message: "" }
  }
}

function _getLegend(formMode: formMode) {
  switch (formMode) {
    case "signin": return "Авторизация";
    case "signup": return "Создание аккаунта";
    case "forgot": return "Сброс пароля";
  }
}