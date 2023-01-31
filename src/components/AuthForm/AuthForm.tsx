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
  const [jsonData, setJsonData] = useState("0");

  return <form
    onSubmit={(event) => _query(event, formMode, setJsonData, setFormMode)}
    className={styles.root}>

    <Email jsonData={jsonData} />
    <LabelForgot formMode={formMode} setFormMode={setFormMode} />
    <Password formMode={formMode} jsonData={jsonData} />
    <YourName formMode={formMode} jsonData={jsonData} />
    <Button formMode={formMode} />
    <Footer formMode={formMode} setFormMode={setFormMode} />
  </form>
}

function _query(
  event: React.FormEvent<HTMLFormElement>,
  formMode: string,
  setJsonData: React.Dispatch<React.SetStateAction<string>>,
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
      setJsonData(res.error);
      return;
    }
    throw new Error(`response status: ${req.status}`)
  })
    .catch(error => console.log(error.message));
}