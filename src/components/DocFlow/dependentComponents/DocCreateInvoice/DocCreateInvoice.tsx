import { useState } from "react";
import DocSelectDirectingForInvoice from "../DocSelectDirectingForInvoice/DocSelectDirectingForInvoice";
import EditForm from "../../EditForm/EditForm";
import session from "../../../../libs/token.manager"

export default function DocCreateInvoice() {
  session.subscribe('DocCreateInvoice');

  const invoiceId = _getInvoiсeId();
  const directings = _getDirectingsWithInvoice();

  const [typeDoc, setTypeDoc] = useState<DocType>();

  if (typeDoc?.directing && typeDoc.task) {
    return <EditForm typeDoc={typeDoc} />
  }

  return <DocSelectDirectingForInvoice setTypeDoc={setTypeDoc} typeDoc={typeDoc} directings={directings} />
}

// ЗАВИСИМОСТЬ от названия типа документа!!!
function _getInvoiсeId() {
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

function _getDirectingsWithInvoice() {
  const arr: IDirecting[] = [];
  session.getMe()?.roles.map(r => {
    r.directings.map(d => {
      d.tasks.map(t => {
        if (t.title === 'Счёт') {
          arr.push(d);
        }
      })
    })
  });
  return arr;
}