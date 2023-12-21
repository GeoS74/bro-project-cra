import { useState } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import session from "../../../libs/token.manager";
import ContactSearchForm from "../ContactSearchForm/ContactSearchForm";
import ContactPane from "../ContactPane/ContactPane";
import styles from "./styles.module.css";

export default function ContactList() {
  session.subscribe('ContactList');

  const [contacts, setContacts] = useState(useLoaderData() as IContact[])

  console.log(contacts)

  return <div className={styles.root} >
    <ContactSearchForm 
      setContacts={setContacts}
    />

    <ContactPane contacts={contacts}/>
  </div>
}



