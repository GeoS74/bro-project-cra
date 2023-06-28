import EditForm from "../../../EditForm/EditForm"
import EditFormInvoice from "../../EditFormInvoice/EditFormInvoice"

type Props = {
  typeDoc: DocType
  tpl?: DocTemplateName
}

export default function WrapEditForm({ typeDoc, tpl }: Props) {
  if(tpl === 'invoice') {
    return <EditFormInvoice typeDoc={typeDoc} />
  }

  return <EditForm typeDoc={typeDoc} />
}
