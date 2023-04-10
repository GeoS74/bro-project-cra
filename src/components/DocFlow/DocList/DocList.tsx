import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import session from "../../../libs/token.manager"
import finder from "../../../libs/deep.finder"
import DocRow from "../DocRow/DocRow"
import SearchForm from "../SearchForm/SearchForm";
import NextSearch from "../NextSearch/NextSearch";
import DocSelectType from "../DocSelectType/DocSelectType"
import styles from "./styles.module.css"

const docsLimit = 25;

export default function DocList() {
  session.subscribe('task');
  const [docs, setDocs] = useState(useLoaderData() as IDoc[])
  const [showForm, setShowForm] = useState(false);
  const [showNextButton , setShowNextButton] = useState(true)

  return <div className={styles.root} >
    <h3>Мои документы</h3>

    <SearchForm setDocs={setDocs} limit={docsLimit} setShowForm={setShowForm} setShowNextButton={setShowNextButton}/>

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

        {docs.length > 0 ? <NextSearch
          setDocs={(newDocs: IDoc[]) => setDocs([...docs, ...newDocs])}
          lastId={docs[docs.length - 1]?.id}
          limit={docsLimit}
          showNextButton={showNextButton}
          setShowNextButton={setShowNextButton}
        />
      : <></>}

        
      </>}
  </div>
}
