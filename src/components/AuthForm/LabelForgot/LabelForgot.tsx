import React from "react";
import styles from "./styles.module.css";
import classNames from "classnames";

type Props = {
  formMode: string,
  setFormMode: React.Dispatch<React.SetStateAction<string>>
}

export const LabelForgot = ({ formMode, setFormMode }: Props) => {
    return (
        <div
            className={classNames(styles.foo, styles.pass, {
                [styles.hidden]: formMode === "forgot",
            })}
        >
            <div className={styles.paslink}>
                <label htmlFor="Password">Password</label>
                <p
                    className={classNames(styles.passButton, {
                        [styles.hidden]: formMode === "forgot",
                    })}
                    onClick={() => {
                      setFormMode("forgot");
                    }}
                >
                    Forgot password?
                </p>
            </div>
        </div>
    );
};
