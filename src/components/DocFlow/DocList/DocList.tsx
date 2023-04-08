import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import session from "../../../libs/token.manager"
import finder from "../../../libs/deep.finder"
import DocRow from "../DocRow/DocRow"
import SearchForm from "../SearchForm/SearchForm";
// import EditForm from "../EditForm/EditForm"
import DocSelectType from "../DocSelectType/DocSelectType"
import styles from "./styles.module.css"

const limitDocs = 25;

export default function DocList() {
  session.subscribe('task');
  const [docs, setDocs] = useState(useLoaderData() as IDoc[])
  const [showForm, setShowForm] = useState(false);

  return <div className={styles.root} >
    <h3>Мои документы</h3>

    <SearchForm setDocs={setDocs} limit={limitDocs} setShowForm={setShowForm}/>

    {showForm ?
      <DocSelectType setShowForm={setShowForm} addDoc={(newDoc: IDoc) => setDocs([newDoc, ...docs])} />
      : <>

        {finder(session.getMe()?.roles, 'Создать') ?
          <button type="button"
            className="btn btn-outline-light mt-4 mb-4"
            onClick={() => setShowForm(true)}
          >Создать документ</button>
          : <></>
        }

        {docs?.map(doc => <DocRow key={doc.id} {...doc} />)}
      </>}
  </div>
}
