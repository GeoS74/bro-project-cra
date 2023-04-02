import { ErrorMessage } from "../ErrorMessage/ErrorMessage"

type Props = {
  title: string | undefined
  errorMessage: IErrorDocMessage | undefined
}

export default function TitleDoc({ title, errorMessage }: Props) {
  return <>
    <div>
      <label htmlFor="titleInput" className="form-label mt-1">Название документа</label>
      <input 
        type="text" 
        id="titleInput" 
        defaultValue={title}
        name="title" 
        className="form-control" 
        placeholder="Введите название документа" />
    </div>
    {errorMessage?.field === "title" ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
  </>
}