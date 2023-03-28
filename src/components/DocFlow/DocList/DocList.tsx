import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import session from "../../../libs/token.manager"
import finder from "../../../libs/deep.finder"
import Doc from "../Doc/Doc"
import styles from "./styles.module.css"

export default function DocList() {
    session.subscribe('task')

    const docs = useLoaderData() as IDoc[];
    console.log(docs)

    return <div className={styles.root} >
        <h3>Мои документы</h3>

        {finder(session.getMe()?.roles, 'Создать') ?
            <button type="button" className="btn btn-outline-light mt-4 mb-4">Создать документ</button>
            : <></>
        }

        {_makeList(docs)}
    </div>
}

function _makeList(docs: IDoc[]) {
    return docs.map(doc => <Doc key={doc.id} {...doc} />)
}