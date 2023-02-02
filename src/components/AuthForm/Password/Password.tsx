import styles from "./styles.module.css";
import { useState } from "react";

import { Eye } from "../Eye/Eye";

type Props = {
  formMode: string,
  errorMessage: IErrorAuthMessage | undefined
}

export const Password = ({ formMode, errorMessage }: Props) => {
  const [visiblePassword, setVisiblePassword] = useState(false);

  return formMode === "forgot" ?
    <></> :

    <div className={styles.password}>
      <input name="password" type={visiblePassword ? "text" : "password"} placeholder="password" />
      <p onClick={() => setVisiblePassword(!visiblePassword)}>
        <Eye visiblePassword={visiblePassword} />
      </p>

      {errorMessage?.field === "password" ? <p className={styles.error}>{errorMessage.message}</p> : <></>}
    </div>
};
