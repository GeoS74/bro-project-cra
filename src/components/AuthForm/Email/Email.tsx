import styles from "./styles.module.css";
import classNames from "classnames";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

type Props = {
  errorMessage: IErrorAuthMessage | undefined
}

export const Email = ({ errorMessage }: Props) => {
  return <div className={classNames(styles.root, "form-group")}>

    <label htmlFor="emailfield" className="form-label mt-4">Email</label>

    <input type="email" id="emailfield" name="email" className="form-control" aria-describedby="emailHelp" placeholder="email" />

    {errorMessage?.field === "email" ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
  </div>
}
