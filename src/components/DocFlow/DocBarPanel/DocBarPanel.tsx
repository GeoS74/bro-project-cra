/**
 * представление документов в виде плитки
 */
import { useSelector } from "react-redux";
import DocBar from "./DocBar/DocBar";
import session from "../../../libs/token.manager"
import styles from "./styles.module.css";
import { ReactComponent as IconFoo } from "./icons/foo.svg";
import finder from "../../../libs/deep.finder";
import AddDocButton from "./AddDocButton/AddDocButton";
import classNames from "classnames";

export default function DocBarPanel() {
  session.subscribe('DocBarPanel');

  const theme = (useSelector((state) => state) as { theme: { theme: string } }).theme.theme

  return <div>

    {finder(session.getMe()?.roles, 'Создать') ?
      <AddDocButton />
      : <></>
    }

    <div className={styles.root}>
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
  </div>
}
