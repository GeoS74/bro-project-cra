import React from "react";
import styles from "./styles.module.css";
import classNames from "classnames";

type Props = {
  valueType: string,
  setValueType: React.Dispatch<React.SetStateAction<string>>
}

export const LabelForgot = ({ valueType, setValueType }: Props) => {
    return (
        <div
            className={classNames(styles.foo, styles.pass, {
                [styles.hidden]: valueType === "forgot",
            })}
        >
            <div className={styles.paslink}>
                <label htmlFor="Password">Password</label>
                <p
                    className={classNames(styles.passButton, {
                        [styles.hidden]: valueType === "forgot",
                    })}
                    onClick={() => {
                        setValueType("forgot");
                    }}
                >
                    Forgot password?
                </p>
            </div>
        </div>
    );
};
