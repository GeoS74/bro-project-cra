import styles from "./styles.module.css";

export const ErrorMessage = ({errorMessage}: {errorMessage: string}) => {
  return <p className={styles.root}>{errorMessage}</p>
}