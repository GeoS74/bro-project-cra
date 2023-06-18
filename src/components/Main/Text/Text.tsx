import { useLoaderData } from "react-router-dom";
import { Converter } from "md-conv"
import styles from "./styles.module.css"

const converter = new Converter()

export default function Text() {
  const about = (useLoaderData() as IAbout[])[1];
  return <div dangerouslySetInnerHTML={{ __html: converter.markdownToHTML(about?.mdInfo) }}
    className={styles.root}>
  </div>
}