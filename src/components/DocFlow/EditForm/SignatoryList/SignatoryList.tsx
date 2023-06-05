import { useState } from "react";
import SignatoryPane from "./SignatoryPane/SignatoryPane"
import SignatorySearchInput from "./SignatorySearchInput/SignatorySearchInput";
import SignatoryDataList from "./SignatoryDataList/SignatoryDataList";

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

    <h4>Список подписантов</h4>
    
    <SignatoryPane signatory={signatory}/>

    <SignatorySearchInput 
      setSignSearchList={setSignSearchList} 
      typeDoc={typeDoc} 
    />

    <SignatoryDataList 
      signatory={signatory}
      setSignatory={setSignatory}
      signSearchList={signSearchList}
      setSignSearchList={setSignSearchList}
    />
  </div>
}
