import { Link } from "react-router-dom";

import serviceHost from "../../../libs/service.host";
import classNames from "classnames"
import styles from "./styles.module.css"

export default function DocRow(doc: IDoc) {
  return <div className={classNames(styles.root, "mt-2")}>

    <h5><Link to={`/docflow/${doc.id}`} className="nav-link">{doc.title}</Link></h5>

    <ul>
      {doc.files.map(file => {
        return <li key={file.fileName + doc.id}>
          <a
          className="text-muted"
            href={`${serviceHost('informator')}/api/informator/docflow/scan/${file.fileName}`}
            download={true}
          >{file.originalName}</a>
        </li>
      })}
    </ul>


    <p>{doc.description}</p>

    <small>{doc.directing?.title} / {doc.task?.title}</small>
  </div>
}