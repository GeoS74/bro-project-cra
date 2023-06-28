import DocCreatePage from "../../../DocCreatePage/DocCreatePage";
import DocCreateInvoice from "../../DocCreateInvoice/DocCreateInvoice";

type Props = {
  tpl?: DocTemplateName
}

export default function WrapCreateDoc({ tpl }: Props) {
  if(tpl === 'invoice') {
    return <DocCreateInvoice />
  }

  return <DocCreatePage />
}
