import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

type Props = {
  formMode: formMode,
  errorMessage: IErrorAuthMessage | undefined
}

export const YourName = ({ formMode, errorMessage }: Props) => {
  return formMode === "signup" ?
    <div className="form-group">

      <label htmlFor="name" className="form-label mt-4">Your name - optional</label>

      <input type="text" id="name" name="name" className="form-control" placeholder="name" />

      {errorMessage?.field === "name" ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
    </div>
    : <></>
}
