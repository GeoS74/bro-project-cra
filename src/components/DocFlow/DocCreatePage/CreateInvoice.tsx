import { useState } from "react";
import session from "../../../libs/token.manager"
import DocSelectType from "../DocSelectType/Wrapper";
import EditForm from "../EditForm/Wrapper";

export default function CreateInvoice() {
  session.subscribe('CreateInvoice');

  const [typeDoc, setTypeDoc] = useState<DocType>();

  if (typeDoc?.directing && typeDoc.task) {
    return <EditForm tpl="invoice" typeDoc={typeDoc}/>
  }

  return <DocSelectType tpl="invoice" setTypeDoc={setTypeDoc} typeDoc={typeDoc} />
}
