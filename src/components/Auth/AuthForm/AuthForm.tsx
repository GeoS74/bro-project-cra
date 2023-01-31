import React from "react";
import styles from "./styles.module.css"
import { useState } from "react";

import config from "../../../config";
import { Email } from "../Email/Email";
import { LabelForgot } from "../LabelForgot/LabelForgot";
import { Password } from "../Password/Password";
import { YourName } from "../YourName/YourName";
import { Button } from "../Button/Button";
import { Footer } from "../Footer/Footer";

export const AuthForm = () => {
  const [valueType, setValueType] = useState("/api/mauth/signin");
  const [jsonData, setJsonData] = useState<string>("0");

  return <form
    onSubmit={(event) => _query(event, valueType, setJsonData, setValueType)}
    className={styles.root}>

    <Email jsonData={jsonData} />
    <LabelForgot valueType={valueType} setValueType={setValueType} />
    <Password valueType={valueType} jsonData={jsonData} />
    <YourName valueType={valueType} jsonData={jsonData} />
    <Button valueType={valueType} />
    <Footer valueType={valueType} setValueType={setValueType} />
  </form>
}

function _query(
  event: React.FormEvent<HTMLFormElement>,
  route: string,
  setJsonData: React.Dispatch<React.SetStateAction<string>>,
  setValueType: React.Dispatch<React.SetStateAction<string>>) {
  event.preventDefault();

  fetch(`${config.auth.back.host}${config.auth.back.port ? ':':''}${config.auth.back.port}${route}`, {
    method: route === "forgot" ? `PATCH` : `POST`,
    body: new FormData(event.currentTarget),
  }).then(async (req) => {
    if (req.ok) {
      setValueType("signin");

      return;
    }
    const res = await req.json();
    setJsonData(res.error);
  });
}