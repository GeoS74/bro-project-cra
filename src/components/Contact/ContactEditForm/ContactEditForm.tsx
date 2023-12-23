import { useState } from "react";
import { useNavigate, NavigateFunction, useLoaderData } from "react-router-dom";

import tokenManager from "../../../libs/token.manager"
import serviceHost from "../../../libs/service.host"
import fetchWrapper from "../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../middleware/response.validator"

import CancelButton from "./CancelButton/CancelButton";
import styles from "./styles.module.css"
import SubmitButton from "./SubmitButton/SubmitButton";
import OptionalHeader from "./OptionalHeader/OptionalHeader";
import InputText from "./InputText/InputText";
import TextPane from "./TextPane/TextPane";
import ContactSearchFormSimple from "../ContactSearchForm/ContactSearchFormSimple";
import BackArrow from "../../DocFlow/BackArrow/BackArrow";


export default function ContactEditForm() {
  const contact = useLoaderData() as IContact;

  const [disabled, setDisabled] = useState(false)
  const [errorMessage, setErrorResponse] = useState<IErrorMessage>();

  const navigate = useNavigate()

  return <>
    <ContactSearchFormSimple />
    <BackArrow />
    <form className={styles.root}
      onSubmit={event => _onSubmit(
        event,
        setDisabled,
        setErrorResponse,
        navigate,
        contact
      )}
    >
      <fieldset disabled={disabled} className="form-group">

        <OptionalHeader {...contact} />

        <legend className="mt-3">{!contact ? "Добавление нового поставщика" : "Изменение данных поставщика"}</legend>

        <InputText errorMessage={errorMessage} val={contact?.title} prefix="title" label="Название организации" />

        <InputText errorMessage={errorMessage} val={contact?.site} prefix="site" label="Сайт" />

        <InputText errorMessage={errorMessage} val={contact?.email} prefix="email" label="email" />

        <InputText errorMessage={errorMessage} val={contact?.phone} prefix="phone" label="phone" />

        <InputText errorMessage={errorMessage} val={contact?.name} prefix="name" label="Контакт" />

        <InputText errorMessage={errorMessage} val={contact?.products} prefix="products" label="Продукция" />

        <TextPane val={contact?.info} />

        <SubmitButton />

        <CancelButton />
      </fieldset>
    </form>
  </>
}

function _onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorResponse: React.Dispatch<React.SetStateAction<IErrorMessage | undefined>>,
  navigate: NavigateFunction,
  contact?: IContact
) {

  event.preventDefault();
  setDisabled(true);

  const fd = new FormData(event.currentTarget)

  fetchWrapper(() => fetch(`${serviceHost('signum')}/api/contact/${contact?.id || ''}`, {
    method: contact ? 'PATCH' : 'POST',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.json();
        return navigate(`/contacts/page/${res.id}`)
      }
      else if (response.status === 400) {
        const res = await response.json()
        setErrorResponse(_getErrorResponse(res.error))
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
    .finally(() => setDisabled(false));
}

function _getErrorResponse(error: string): IErrorMessage {
  switch (error) {
    case "invalid title":
      return { field: "title", message: "Введите название документа" }
    case "invalid directing id":
      return { field: "directSelect", message: "Не выбрано направление" }
    case "invalid task id":
      return { field: "taskSelect", message: "Не выбран тип документа" }
    case "bad mime type":
      return { field: "fileUpload", message: "Не поддерживаемый тип файлов" }
    default: return { field: "", message: "" }
  }
}