import EditDefaultDoc from "./EditDefaultDoc"

type Props = {
  tpl?: DocTemplateName
}

export default function WrapEditForm({ tpl }: Props) {
  if(tpl === 'invoice') {
    return <EditDefaultDoc />
  }

  return <EditDefaultDoc />
}
