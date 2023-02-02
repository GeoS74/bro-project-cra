import styles from "./styles.module.css";
import classNames from "classnames";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

type Props = {
  errorMessage: IErrorAuthMessage | undefined
}

export const Email = ({ errorMessage }: Props) => {
  return <div className={classNames(styles.email, styles.foo)}>
    <label htmlFor="Email">Email</label>
    <input type="text" id="Email" name="email" placeholder="email" />

    {errorMessage?.field === "email" ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
  </div>
}