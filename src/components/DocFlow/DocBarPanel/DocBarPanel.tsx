/**
 * представление документов в виде плитки
 */
import DocBar from "./DocBar/DocBar";
import DocBarLink from "./DocBarLink/DocBarLink";
import session from "../../../libs/token.manager";
import finder from "../../../libs/deep.finder";
import { ReactComponent as IconFoo } from "./icons/foo.svg";
import { ReactComponent as IconFilter } from "./icons/filter-square.svg";
import { ReactComponent as IconFire } from "./icons/fire.svg";
import { ReactComponent as IconFolder } from "./icons/folder.svg";
import { ReactComponent as IconPhone } from "./icons/telephone-outbound.svg";
import AddDocButton from "./AddDocButton/AddDocButton";
import DepAddInvoice from "./DepAddInvoice/DepAddInvoice";
import DepInvocesForDirector from "./DepInvocesForDirector/DepInvocesForDirector";
import styles from "./styles.module.css";

export default function DocBarPanel() {
  session.subscribe('DocBarPanel');

  return <div>

    {/* {finder(session.getMe()?.roles, 'Создать') ?
      <AddDocButton />
      : <></>
    } */}

    <div className={styles.root}>

    {/* {_actionFinder(session.getMe()?.roles[0], 'Поставщики') ? */}
        <DocBarLink
        title="Поставщики"
        Icon={IconPhone}
        queryString="/contacts"
      />
        {/* : <></>} */}

      {_actionFinder(session.getMe()?.roles[0], 'Поставщики', 'Справочник', 'Создать') ?
        <DocBarLink
        title="Добавить поставщика"
        Icon={IconPhone}
        queryString="/contacts/create"
      />
        : <></>}

      

      {/* <DepInvocesForDirector />

      <DocBar
        title="На утверждение"
        Icon={IconFire}
        queryString="?acceptor=0&limit=50"
      />

      <DocBar
        title="На рассмотрение"
        Icon={IconFoo}
        queryString="?recipient=0&limit=50"
      />

      <DocBar
        title="Исходящие"
        Icon={IconFilter}
        queryString="?author=1&limit=50"
      />

      <DocBar
        title="Мои документы"
        Icon={IconFolder}
        queryString="?limit=50"
      />

      <DepAddInvoice /> */}
    </div>
  </div>
}

function _actionFinder(
  role?: IRole,
  titleDirecting?: string,
  titleTask?: string,
  action?: ActionMode,
): boolean {
  if(!titleTask && !action) {
    return !!role
      ?.directings.find(e => e.title === titleDirecting)
  }

  return !!role
    ?.directings.find(e => e.title === titleDirecting)
    ?.tasks.find(e => e.title === titleTask)
    ?.actions.find(e => e.title === action);
}