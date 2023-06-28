import { useLoaderData } from "react-router-dom";
import session from "../../../libs/token.manager";
import EditForm from "../EditForm/Wrapper";

export default function WrapEditForm() {
  session.subscribe('WrapEditForm');

  const doc = useLoaderData() as IDoc;
  const typeDoc = { 
    directing: doc.directing as IDirecting, 
    task: doc.task as ITask 
  }

  if(doc.task.title === 'Счёт') {
    return <EditForm typeDoc={typeDoc} doc={doc} tpl="invoice" />
  }
  
  return <EditForm typeDoc={typeDoc} doc={doc} />
}
