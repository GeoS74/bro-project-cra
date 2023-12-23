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
    <BackArrow />
    <div className={classNames(styles.root)}>
    <OptionalHeader {...p} />
      <h3 className="mt-4">{p.title}</h3>
      
      <div className="mt-4">
        <p>email: {p.email}</p>
      </div>

      <div className="mt-4"><pre>{p.info}</pre></div>
    </div>
    </>
}