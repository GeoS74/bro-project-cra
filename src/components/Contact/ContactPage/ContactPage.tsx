import { useLoaderData } from "react-router-dom"
import SearchForm from "../../Main/SearchForm/SearchForm";
import classNames from "classnames";
import styles from "./styles.module.css"
import Head from "../../Head/Head";
import ContactSearchFormSimple from "../ContactSearchForm/ContactSearchFormSimple";
import BackArrow from "../../DocFlow/BackArrow/BackArrow";
import OptionalHeader from "../ContactOptionalHeader/ContactOptionalHeader";

export default function ContactPage() {
    const p = useLoaderData() as IContact;

    return <>
    <ContactSearchFormSimple />
    <BackArrow path={"/contacts"}  />
    <div className={classNames(styles.root, "card")}>
    <OptionalHeader {...p} />
      <h3 className="mt-4">{p.title}</h3>

      {p.products ? <div className="mt-4">{p.products}</div> : ""}
      {p.phone || p.name ? <div className="mt-4">{p.phone} {p.name}</div> : ""}
      {p.email ? <div className="mt-4">{p.email}</div> : ""}
      {p.site ? <div className="mt-4"><a href={p.site} target="_blank" rel="noreferrer">{p.site}</a></div> : ""}

      {p.info ? 
        <div className="mt-4">
          <small>доп. информация:</small>
          <pre className="mt-2">{p.info}</pre>
        </div>
        : <></>}

    </div>
    </>
}