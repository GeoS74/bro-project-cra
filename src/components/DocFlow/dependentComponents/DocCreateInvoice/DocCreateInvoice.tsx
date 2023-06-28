import { useState } from "react";
import session from "../../../../libs/token.manager"
import DocSelectDirectingForInvoice from "../DocSelectDirectingForInvoice/DocSelectDirectingForInvoice";
import WrapEditForm from "../Wrappers/WrapEditForm/WrapEditForm";

export default function DocCreateInvoice() {
  session.subscribe('DocCreateInvoice');

  const [typeDoc, setTypeDoc] = useState<DocType>();

  if (typeDoc?.directing && typeDoc.task) {
    return <WrapEditForm tpl="invoice" typeDoc={typeDoc}/>
  }

  return <DocSelectDirectingForInvoice setTypeDoc={setTypeDoc} />
}
