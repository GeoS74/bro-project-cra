import styles from "./styles.module.css";
import classNames from "classnames";

type Props = {
  formMode: string,
  setFormMode: React.Dispatch<React.SetStateAction<formMode>>
}

export const Footer = ({ formMode, setFormMode }: Props) => {
  return <div className={classNames(styles.foo, styles.pandlink)}>
    <p>
      {formMode === "signin" ? "Not registered?" : "Already have an account?"}

      <button onClick={(event) => {
        event.preventDefault()
        setFormMode(formMode === 'signin' ? 'signup' : 'signin')
      }}>
        {formMode === "signin" ? "Create an account" : "Sign in"}
      </button>
    </p>
  </div>
};
