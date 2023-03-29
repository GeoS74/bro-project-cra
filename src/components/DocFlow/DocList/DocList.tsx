import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import session from "../../../libs/token.manager"
import finder from "../../../libs/deep.finder"
import Doc from "../Doc/Doc"
import styles from "./styles.module.css"

export default function DocList() {
  session.subscribe('task');
  const [idActiveDoc, setIdActiveDoc] = useState('-1');

  const [docs, setDocs] = useState(useLoaderData() as IDoc[])

  // console.log(docs)

  return <div className={styles.root} >
    <h3>Мои документы</h3>

    {finder(session.getMe()?.roles, 'Создать') ?
      <button type="button"
        className="btn btn-outline-light mt-4 mb-4"
        onClick={() => setIdActiveDoc('0')}
      >Создать документ</button>
      : <></>
    }

    {idActiveDoc === '0' ?
      <Doc
        id={idActiveDoc}
        idActiveDoc={idActiveDoc}
        setIdActiveDoc={setIdActiveDoc}
        addDoc={(newDoc: IDoc) => setDocs([newDoc, ...docs])}
      /> : <></>}

    {docs.map(doc => <Doc
      key={doc.id}
      {...doc}
      idActiveDoc={idActiveDoc}
      setIdActiveDoc={setIdActiveDoc}
    />)}
  </div>
}
