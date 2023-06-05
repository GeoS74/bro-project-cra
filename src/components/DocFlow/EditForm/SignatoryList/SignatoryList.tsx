import { useState } from "react";
import tokenManager from "../../../../libs/token.manager"
import serviceHost from "../../../../libs/service.host"
import fetchWrapper from "../../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../../middleware/response.validator"
import SignatoryPane from "./SignatoryPane/SignatoryPane"
import SignatorySearchInput from "./SignatorySearchInput/SignatorySearchInput";

import classNames from "classnames";
import styles from "./styles.module.css"

type Props = {
  typeDoc: DocType
  acceptor?: IDocSignatory[]
}

export default function SignatoryList({ typeDoc, acceptor }: Props) {
  const [signSearchList, setSignSearchList] = useState<IDocSignatory[]>([]);

  const [signatory, setSignatory] = useState(acceptor || []);

  return <div className={classNames(styles.root, "mt-4")}>

    <h4>Список подписанмтов</h4>
    
    <SignatoryPane signatory={signatory}/>

    <SignatorySearchInput setSignSearchList={setSignSearchList} typeDoc={typeDoc} />

    <div className={styles.dataList}>
      {signSearchList?.map(s => <div
        key={s.uid}
        onClick={() => {
          if(!signatory.find(e => e.uid === s.uid)){
            setSignatory([...signatory, s])
          }
          setSignSearchList(signSearchList.filter(e => e.uid !== s.uid))
        }}
      >{`${s.name} ${s.email}`}
      </div>)}
    </div>


  </div>
}
