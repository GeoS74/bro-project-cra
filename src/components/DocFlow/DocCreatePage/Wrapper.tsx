import CreateDefaultDoc from "./CreateDefaultDoc";
import CreateInvoice from "./CreateInvoice";

type Props = {
  tpl?: DocTemplateName
}

export default function WrapCreateDoc({ tpl }: Props) {
  if(tpl === 'invoice') {
    return <CreateInvoice />
  }

  return <CreateDefaultDoc />
}
