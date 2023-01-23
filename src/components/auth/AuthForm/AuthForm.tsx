import React from "react";
import styles from "./styles.module.css"
import classNames from "classnames";
import { useState } from "react";

import { Email } from "../Email/Email";
import { LabelForgot } from "../LabelForgot/LabelForgot";
import { Password } from "../Password/Password";
import { YourName } from "../YourName/YourName";
import { Button } from "../Button/Button";
import { Footer } from "../Footer/Footer";


function _query(event: React.FormEvent<HTMLFormElement>, 
                route: string, 
                setJsonData: React.Dispatch<React.SetStateAction<string>>, 
                setValueType: React.Dispatch<React.SetStateAction<string>>) {
    event.preventDefault();
    fetch(`http://localhost:3001/${route}`, {
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

export const AuthForm = () => {
    const [valueType, setValueType] = useState("signin");
    const [jsonData, setJsonData] = useState<string>("0");
    return (
    <div className={classNames(styles.root)}>
        <form 
            onSubmit={(event) => _query.call(this, event, valueType, setJsonData, setValueType)}
            className={classNames(
                { [styles.border]: valueType === "signin" },
                { [styles.borderReg]: valueType === "signup" },
                { [styles.borderForgot]: valueType === "forgot" }
            )}>
            <Email jsonData={jsonData} />
            <LabelForgot valueType={valueType} setValueType={setValueType} />
            <Password valueType={valueType} jsonData={jsonData} />
            <YourName valueType={valueType} jsonData={jsonData} />
            <Button valueType={valueType} />
            <Footer valueType={valueType} setValueType={setValueType} />
        </form>        
    </div>
    );
}