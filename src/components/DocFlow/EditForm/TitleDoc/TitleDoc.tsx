import { ErrorMessage } from "../ErrorMessage/ErrorMessage"

type Props = {
  errorMessage: IErrorDocMessage | undefined
}

export default function TitleDoc({ errorMessage }: Props) {
  return <>
    <div>
      <label htmlFor="titleInput" className="form-label mt-1">Название документа</label>
      <input type="text" id="titleInput" name="title" className="form-control" placeholder="Введите название документа" />
    </div>
    {errorMessage?.field === "title" ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
  </>
}