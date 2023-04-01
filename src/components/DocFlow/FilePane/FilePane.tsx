import classNames from "classnames"
import { ErrorMessage } from "../ErrorMessage/ErrorMessage"

import uploadIcon from "./image/uploadScan.svg"
import styles from "./styles.module.css"

type Props = {
  errorMessage: IErrorDocMessage | undefined
  setFileList: (file: FileList) => void
}

export default function FilePane({ errorMessage, setFileList }: Props) {
  return <div className={classNames("form-group mb-4", styles.root)}>

    <p className="mt-4" onClick={event => (event.currentTarget.nextElementSibling as HTMLElement).click()}>
      <img src={uploadIcon} loading="lazy" />
      <small>Добавить скан-копию</small></p>

    <InputFile setFileList={setFileList} />
    {errorMessage?.field === "title" ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
  </div>
}

function InputFile({ setFileList }: {
  setFileList: (file: FileList) => void
}) {
  return <input type="file" onChange={event => _foo(event, setFileList)} />
}

function _foo(
  event: React.ChangeEvent<HTMLInputElement>,
  setFileList: (file: FileList) => void
) {
  const foo = event.currentTarget.files

  if(foo) {
    setFileList(foo);
  }

}
