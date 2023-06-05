import { useState } from "react";
import tokenManager from "../../../../libs/token.manager"
import serviceHost from "../../../../libs/service.host"
import fetchWrapper from "../../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../../middleware/response.validator"

import classNames from "classnames";
import styles from "./styles.module.css"


export default function SignatoryList() {
  const [signSearchList, setSignSearchList] = useState<IDocSignatory[]>([]);
  const [signatory, setSignatory] = useState<{[key: string]: IDocSignatory}>({});

  return <div className={classNames(styles.root, "mt-4")}>
    <ul>
      {Object.values(signatory)?.map(s => <li
        key={s.uid}
        >{`${s.name} ${s.email}`}
      </li>)}
    </ul>

    <label htmlFor="signatoryInput" className="form-label mt-1">Подписывает</label>
    <input
      autoComplete="off"
      type="text"
      id="signatoryInput"
      className="form-control"
      placeholder="Введите Ф.И.О. или должность"
      onKeyUp={(event) => {
        _searchUser(event.currentTarget.value, setSignSearchList)
      }}
      // onBlur={() => setSignSearchList(undefined)}
    />

    <div className={styles.dataList}>
      {signSearchList?.map(s => <div
        key={s.uid}
        onClick={() => {
          setSignatory({...signatory, [s.uid]: s});
          const foo = signSearchList.filter(e => e.uid !== s.uid);
          setSignSearchList(foo)
        }}
      >{`${s.name} ${s.email}`}
      </div>)}
    </div>
  </div>
}

function _searchUser(
  value: string,
  setSignSearchList: React.Dispatch<React.SetStateAction<IDocSignatory[]>>,
) {
  fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/user/search/?search=${value}&limit=5`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.json();
        setSignSearchList(res)
        return
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message));
}