import styles from "./styles.module.css";
import classNames from "classnames";
import { ThemeContext } from "../../../contexts/ThemeContext/ThemeContext";

export const Button = ({ formMode }: { formMode: AuthFormMode }) => {
  return <div>
    <ThemeContext.Consumer>
      {({ theme }) => (
        <button className={classNames(styles.root, `mt-4 btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`)}>{_getTitle(formMode)}</button>
      )}
    </ThemeContext.Consumer>
  </div>
};

function _getTitle(formMode: AuthFormMode) {
  switch (formMode) {
    case "signin": return "Sign in";
    case "signup": return "Create an account";
    case "forgot": return "Reset password";
  }
}
