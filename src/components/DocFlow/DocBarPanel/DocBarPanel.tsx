/**
 * представление документов в виде плитки
 */
import DocBar from "./DocBar/DocBar";
import session from "../../../libs/token.manager"
import styles from "./styles.module.css";
import { ReactComponent as IconFoo } from "./icons/foo.svg";

export default function DocBarPanel() {
  session.subscribe('DocBarPanel');

  return <div className={styles.root}>
    <DocBar
      path="/docflow/"
      title="На утверждение"
      Icon={IconFoo}
      mode="meAcceptor"
    />

    <DocBar
      path="/docflow/"
      title="На рассмотрение"
      Icon={IconFoo}
      mode="meRecipient"
    />

    <DocBar
      path="/docflow/"
      title="Исходящие"
      Icon={IconFoo}
      mode="meAuthor"
    />

  </div>
}
