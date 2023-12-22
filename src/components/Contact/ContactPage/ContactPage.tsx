import { useLoaderData } from "react-router-dom"
import SearchForm from "../../Main/SearchForm/SearchForm";
import classNames from "classnames";
import styles from "./styles.module.css"
import Head from "../../Head/Head";
import ContactSearchFormSimple from "../ContactSearchForm/ContactSearchFormSimple";

export default function ContactPage() {
    const p = useLoaderData() as IContact;

    return <>
    <ContactSearchFormSimple />
    <div className={classNames(styles.root)}>
      <div>{p.title}</div>
      <div className="mt-4">{p.email}</div>

      <div className="mt-4"><pre>{p.info}</pre></div>
    </div>
    </>
}