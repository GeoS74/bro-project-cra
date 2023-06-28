import { useState } from "react";
import session from "../../../libs/token.manager"
import DocSelectType from "../DocSelectType/Wrapper";
import EditForm from "../EditForm/Wrapper";

export default function DocCreatePage(){
  session.subscribe('DocCreatePage');

  const [typeDoc, setTypeDoc] = useState<DocType>();

  if(typeDoc?.directing && typeDoc.task) {
    
    if(typeDoc.task.title === 'Счёт') {
      return <EditForm tpl="invoice" typeDoc={typeDoc}/>
    }
    return <EditForm typeDoc={typeDoc}/>
  }

  return <DocSelectType setTypeDoc={setTypeDoc} typeDoc={typeDoc}/>
}