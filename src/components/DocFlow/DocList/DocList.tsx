import { useLoaderData, useLocation } from "react-router-dom";
import DocRow from "../DocRow/DocRow";
import NextSearch from "../NextSearch/NextSearch";
import styles from "./styles.module.css";
import { useState } from "react";

export default function DocList() {
  const [docs, setDocs] = useState(useLoaderData() as IDoc[])
  const [showNextButton, setShowNextButton] = useState(true)

  const {state, search} = useLocation();


  console.log(useLocation())

  return <div className={styles.root} >
    <h3>Документы {state.titleDocList}</h3>

    {docs?.map(doc => <DocRow key={doc.id} {...doc} />)}

    {docs.length > 0 ? <NextSearch
      setDocs={(newDocs: IDoc[]) => setDocs([...docs, ...newDocs])}
      lastId={docs[docs.length - 1]?.id}
      limit={1}
      showNextButton={showNextButton}
      setShowNextButton={setShowNextButton}
    />
      : <></>}

  </div>
}



