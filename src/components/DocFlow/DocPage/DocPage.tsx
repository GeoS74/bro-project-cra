import { useLoaderData } from "react-router-dom";

import styles from "./styles.module.css"

export default function DocPage() {
    const data = useLoaderData() as IDoc;

    return <div className={styles.root}>
        <h3 className="mb-4">{data.title}</h3>
        <small>{data.directing?.title} / {data.task?.title}</small>
        <p className="mt-2">{data.description}</p>
    </div>
}