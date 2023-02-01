import styles from "./styles.module.css";
import classNames from "classnames";

type Props = {
  errorMessage: IErrorResponse | undefined
}

export const Email = ({ errorMessage }: Props) => {
  return (
    <div className={classNames(styles.email, styles.foo)}>
      <label htmlFor="Email">Email</label>
      <input type="text" id="Email" name="email" placeholder="email" />

      {errorMessage?.field === "email" ? <p className={styles.error}>{errorMessage.message}</p> : <></>}
    </div>
  );
}