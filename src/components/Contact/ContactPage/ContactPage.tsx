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
    <div className={classNames(styles.root)}>
    <OptionalHeader {...p} />
      <h3 className="mt-4">{p.title}</h3>

      <div className="mt-4">
        <p>сайт: {p.site}</p>
      </div>

      <div className="mt-4">
        <p>email: {p.email}</p>
      </div>

      <div className="mt-4">
        <p>тел.: {p.phone}</p>
      </div>

      <div className="mt-4">
        <p>контакт: {p.name}</p>
      </div>

      <div className="mt-4">
        <p>продукция: {p.products}</p>
      </div>

      <div className="mt-4">
      <p>доп. информация:</p>
        <pre>{p.info}</pre></div>
    </div>
    </>
}