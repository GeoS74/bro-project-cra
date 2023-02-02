import styles from "./styles.module.css";
import { useState } from "react";

import { Eye } from "../Eye/Eye";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import classNames from "classnames";

type Props = {
  formMode: string,
  errorMessage: IErrorAuthMessage | undefined
}

export const Password = ({ formMode, errorMessage }: Props) => {
  const [visiblePassword, setVisiblePassword] = useState(false);

  return formMode === "forgot" ?
    <></> :
    <div className={classNames(styles.root, "form-group")}>
      
      <label htmlFor="password" className="form-label mt-4">Password</label>
      
      <input type={visiblePassword ? "text" : "password"} id="password" name="password" className="form-control" placeholder="password" />
      
      <span onClick={() => setVisiblePassword(!visiblePassword)} className={styles.eye}>
        <Eye visiblePassword={visiblePassword} />
      </span>

      {errorMessage?.field === "password" ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
    </div>
};
