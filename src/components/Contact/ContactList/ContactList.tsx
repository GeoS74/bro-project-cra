import { useState } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import session from "../../../libs/token.manager";
import ContactSearchForm from "../ContactSearchForm/ContactSearchForm";
import ContactPane from "../ContactPane/ContactPane";
import BackArrow from "../../DocFlow/BackArrow/BackArrow";
import styles from "./styles.module.css";

export default function ContactList() {
  session.subscribe('ContactList');

  const [contacts, setContacts] = useState(useLoaderData() as IContact[])

  return <div className={styles.root} >
    <ContactSearchForm 
      setContacts={setContacts}
    />
    {/* <BackArrow /> */}

    <ContactPane contacts={contacts}/>
  </div>
}



