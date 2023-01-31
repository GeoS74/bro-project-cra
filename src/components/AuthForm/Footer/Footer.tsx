import styles from "./styles.module.css";
import classNames from "classnames";

type Props = {
  formMode: string,
  setFormMode: React.Dispatch<React.SetStateAction<string>>
}

export const Footer = ({ formMode, setFormMode }: Props) => {
  const dateForm = {
    notReg: "Not registered?",
    already: "Already have an account?",
    nameLink1: "Create an account",
    signin: "Sign in",
  };

  return (
    <div>
      <div className={classNames(styles.foo, styles.pandlink)}>
        <p>
          {formMode === "signin" ? dateForm.notReg : dateForm.already}
          <button onClick={event => {
            event.preventDefault();
            setFormMode(formMode === 'signin' ? 'signup' : 'signin');
            }}>
            {formMode === "signin" ? dateForm.nameLink1 : dateForm.signin}
          </button>
        </p>
      </div>
    </div>
  );
};
