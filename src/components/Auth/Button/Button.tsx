import React from "react";
import styles from "./styles.module.css";
import classNames from "classnames";

export const Button = ({ valueType }: {valueType: string}) => {
    interface dateFormat {
        [index: string]: string
    }
    
    const dateForm: dateFormat = {
        signin: "Sign in",
        signup: "Create an account",
        forgot: "Reset password",
    };
    return (
        <div>
            <button className={classNames(styles.foo)}>{dateForm[valueType]}</button>
        </div>
    );
};
