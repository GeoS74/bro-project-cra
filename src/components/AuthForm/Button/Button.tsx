import styles from "./styles.module.css";
import classNames from "classnames";

export const Button = ({ formMode }: { formMode: string }) => {
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
      <button className={classNames(styles.foo)}>{dateForm[formMode]}</button>
    </div>
  );
};
