import { Link } from "react-router-dom";

import serviceHost from "../../../libs/service.host";
import classNames from "classnames"
import styles from "./styles.module.css"

export default function Doc(doc: IDoc) {
  return <div className={classNames(styles.root, "mt-2")}>

    <h5><Link to={`/docflow/${doc.id}`} className="nav-link">{doc.title}</Link></h5>

    {doc.files.map(file => {
      return <a
        key={file.fileName + doc.id}
        href={`${serviceHost('informator')}/api/informator/docflow/scan/${file.fileName}`}
        download={true}
      >{file.originalName}</a>
    })}

    <p>{doc.description}</p>

    <small>{doc.directing?.title} / {doc.task?.title}</small>
    <small>{doc.title}</small>
  </div>
}