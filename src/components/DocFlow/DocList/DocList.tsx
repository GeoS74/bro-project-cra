import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import session from "../../../libs/token.manager"
import finder from "../../../libs/deep.finder"
import Doc from "../Doc/Doc"
import EditForm from "../EditForm/EditForm";
import styles from "./styles.module.css"

export default function DocList() {
  session.subscribe('task');
  const [showForm, setShowForm] = useState(false);
  const [docs, setDocs] = useState(useLoaderData() as IDoc[])

  return <div className={styles.root} >
    <h3>Мои документы</h3>

    {finder(session.getMe()?.roles, 'Создать') ?
      <button type="button"
        className="btn btn-outline-light mt-4 mb-4"
        onClick={() => setShowForm(true)}
      >Создать документ</button>
      : <></>
    }

    {showForm ?
      <EditForm setShowForm={setShowForm} addDoc={(newDoc: IDoc) => setDocs([newDoc, ...docs])} />
      : <></>}

    {docs.map(doc => <Doc key={doc.id} {...doc} />)}
  </div>
}
