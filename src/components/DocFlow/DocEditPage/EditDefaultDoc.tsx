import { useLoaderData } from "react-router-dom";
import session from "../../../libs/token.manager";
import EditForm from "../EditForm/Wrapper";

export default function EditDefaultPage(){
  session.subscribe('DocEditPage');

  const doc = useLoaderData() as IDoc;
  const typeDoc = { 
    directing: doc.directing as IDirecting, 
    task: doc.task as ITask 
  }

  return <EditForm typeDoc={typeDoc} doc={doc} />
}