import styles from "./styles.module.css";
import classNames from "classnames";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

type Props = {
  formMode: string,
  errorMessage: IErrorAuthMessage | undefined
}

export const YourName = ({ formMode, errorMessage }: Props) => {
  return <div className={styles.root}>
    <div className={classNames({ [styles.name]: formMode === "signup" }, { [styles.hidden]: formMode !== "signup" }, styles.foo)}>
      <label htmlFor="YourName">Your name - optional</label>
      <input type="text" id="YourName" name="name" placeholder="name" />
    </div>

    {errorMessage?.field === "name" ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
  </div>
};
