import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import classNames from "classnames";

import session from "../../../libs/token.manager";
import finder from "../../../libs/deep.finder";
import DocRow from "../DocRow/DocRow";
// import SearchForm from "../SearchForm/SearchForm";
import NextSearch from "../NextSearch/NextSearch";
import TaskPage from "../TaskPage/TaskPage";
import DocSelectType from "../DocSelectType/DocSelectType";


const docsLimit = 25;

export default function DocList() {
  const [docs, setDocs] = useState(useLoaderData() as IDoc[])

// console.log(docs)
  return <div className={styles.root} >
    <h3>Мои документы</h3>

    {docs?.map(doc => <DocRow key={doc.id} {...doc} />)}

    {/* {docs.length > 0 ? <NextSearch
      setDocs={(newDocs: IDoc[]) => setDocs([...docs, ...newDocs])}
      lastId={docs[docs.length - 1]?.id}
      limit={docsLimit}
      showNextButton={showNextButton}
      setShowNextButton={setShowNextButton}
    />
      : <></>} */}

  </div>
}



