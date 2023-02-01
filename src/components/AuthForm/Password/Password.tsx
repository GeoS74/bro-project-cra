import styles from "./styles.module.css";
import classNames from "classnames";
import { useState } from "react";

import { Eye } from "../Eye/Eye";

type Props = {
  formMode: string,
  errorMessage: IErrorResponse | undefined
}

export const Password = ({ formMode, errorMessage }: Props) => {
  const [visiblePassword, setVisiblePassword] = useState(false);

  return formMode === "forgot" ?

    <div className={styles.password}>
      <input name="password" type={visiblePassword ? "text" : "password"} placeholder="password" />
      <p onClick={eyeSlash}>
        <Eye valueSlash={valueEyeSlash} />
      </p>

      {errorMessage?.field === "email" ? <p className={styles.error}>{errorMessage.message}</p> : <></>}
    </div>
    : <></>
};
