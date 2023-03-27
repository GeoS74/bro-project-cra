import styles from "./styles.module.css";
import classNames from "classnames";

export const Button = ({ formMode }: { formMode: formMode }) => {
  return <div>
    <button className={classNames(styles.root, "btn btn-outline-light mt-4")}>{_getTitle(formMode)}</button>
  </div>
};

function _getTitle(formMode: formMode) {
  switch (formMode) {
    case "signin": return "Sign in";
    case "signup": return "Create an account";
    case "forgot": return "Reset password";
  }
}
