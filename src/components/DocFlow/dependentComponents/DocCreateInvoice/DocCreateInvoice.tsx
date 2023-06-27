import { useState } from "react";
import DocSelectDirectingForInvoice from "../DocSelectDirectingForInvoice/DocSelectDirectingForInvoice";
import EditForm from "../../EditForm/EditForm";
import session from "../../../../libs/token.manager"

export default function DocCreateInvoice(){
  session.subscribe('DocCreateInvoice');

  const [typeDoc, setTypeDoc] = useState<DocType>();

  if(typeDoc?.directing && typeDoc.task) {
    return <EditForm typeDoc={typeDoc}/>
  }

  return <DocSelectDirectingForInvoice setTypeDoc={setTypeDoc} typeDoc={typeDoc}/>
}

// ЗАВИСИМОСТЬ от названия типа документа!!!
function _getInvoiseId() {
  let invoiceId = 0;

  session.getMe()?.roles.map(r => {
    r.directings.map(d => {
      d.tasks.map(t => {
        if (t.title === 'Счёт') {
          invoiceId = t.id;
        }
      })
    })
  });
  return invoiceId
}