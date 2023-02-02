import React from "react";
import styles from "./styles.module.css";

type Props = {
  setFormMode: React.Dispatch<React.SetStateAction<formMode>>
}

export const LabelForgot = ({ setFormMode }: Props) => {
  return <div className={styles.paslink}>
    <label htmlFor="Password">Password</label>
    <p onClick={() => setFormMode("forgot")}>Forgot password?</p>
  </div>
};
