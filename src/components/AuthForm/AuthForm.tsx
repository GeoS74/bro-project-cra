import { useState } from "react";
import { useNavigate } from "react-router-dom";

import serviceHost from "../../libs/service.host"
import tokenManager from "../../libs/token.manager"

import { Email } from "./Email/Email";
import { Password } from "./Password/Password";
import { YourName } from "./YourName/YourName";
import { Button } from "./Button/Button";
import { Footer } from "./Footer/Footer";
import styles from "./styles.module.css"

import session from "../../libs/token.manager"

export const AuthForm = () => {
  const [formMode, setFormMode] = useState<formMode>("signin");
  const [errorMessage, setErrorResponse] = useState<IErrorAuthMessage | undefined>();
  const [disabled, setDisabled] = useState(false)
  const navigate = useNavigate();

  /* lifehack for navigate hook */
  const nav = (path: string) => navigate(path)

  return <div className={styles.root}>
    <form onSubmit={(event) => _query(event, formMode, setFormMode, setErrorResponse, setDisabled, nav)}>

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
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: (path: string) => void) {

  event.preventDefault();
  setDisabled(true)

  fetch(`${serviceHost("mauth")}/api/mauth/${formMode}`, {
    method: formMode === "forgot" ? `PATCH` : `POST`,
    body: new FormData(event.currentTarget),
  }).then(async (req) => {
    if (req.ok) {

      if (formMode === "signin") {
        const result: IAuthResponse = await req.json()
        _updateTokens(result)

        // await session.start()

        navigate('/')
        return;
      }

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
    case "incorrect password":
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

function _updateTokens(tokens: IAuthResponse) {
  tokenManager.setAccess(tokens.access)
  tokenManager.setRefresh(tokens.refresh)
}