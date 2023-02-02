import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

type Props = {
  formMode: string,
  errorMessage: IErrorAuthMessage | undefined
}

export const YourName = ({ formMode, errorMessage }: Props) => {
  return formMode === "signup" ?
    <div>
    <label htmlFor="YourName">Your name - optional</label>
    <input type="text" id="YourName" name="name" placeholder="name" />

    {errorMessage?.field === "name" ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
  </div> :
  <></>
};
