import styles from "./styles.module.css";

export const Button = ({ formMode }: { formMode: formMode }) => {
  return <div>
    <button className={styles.root}>{_getTitle(formMode)}</button>
  </div>
};

function _getTitle(formMode: formMode) {
  switch (formMode) {
    case "signin": return "Sign in";
    case "signup": return "Create an account";
    case "forgot": return "Reset password";
  }
}
