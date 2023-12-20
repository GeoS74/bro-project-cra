import { useLoaderData, useLocation } from "react-router-dom";
import session from "../../../libs/token.manager";
import styles from "./styles.module.css";
import { useState } from "react";

export default function ContactList() {
  session.refreshTokens();
  session.refreshTokens();
  session.subscribe('ContactList');

  const [contacts, setContacts] = useState(useLoaderData() as IContact[])

  console.log(contacts)

  return <div className={styles.root} >
    <h3 className="mb-4">foo</h3>
  </div>
}



