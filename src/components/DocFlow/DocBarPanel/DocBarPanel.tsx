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

{/* {finder(session.getMe()?.roles, 'Создать') ?
      <button type="button"
        className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`, styles.button)}
        onClick={() => setShowForm(true)}
      >Создать документ</button>
      : <></>
    } */}

    <DocBar
      title="На утверждение"
      Icon={IconFoo}
      queryString="?acceptor=0"
    />

    <DocBar
      title="На рассмотрение"
      Icon={IconFoo}
      queryString="?recipient=0"
    />

    <DocBar
      title="Исходящие"
      Icon={IconFoo}
      queryString="?author=1"
    />

  </div>
}
