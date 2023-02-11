import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Converter } from "md-conv"

import Navigate from "../navigate/Navigate";
import styles from "./styles.module.css"

const converter = new Converter()

export default function About() {
  const [md, setMD] = useState(useLoaderData() as IAbout)

  return <>
    <Navigate />

    {md.mdInfo ?
      <div dangerouslySetInnerHTML={{ __html: converter.markdownToHTML(md.mdInfo) }}
        className={styles.root}>
      </div>
      : <></>}
  </>

}