import { useLoaderData, useLocation } from "react-router-dom";
import DocRow from "../DocRow/DocRow";
import styles from "./styles.module.css";

export default function DocList() {
  const docs = useLoaderData() as IDoc[];
  const {titleDocList} = useLocation().state;

  return <div className={styles.root} >
    <h3>Документы {titleDocList}</h3>

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



