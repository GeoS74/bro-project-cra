import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css"
import classNames from "classnames";

import session from "../../../libs/token.manager"
import tokenManager from "../../../libs/token.manager"
import serviceHost from "../../../libs/service.host"
import fetchWrapper from "../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../middleware/response.validator"
import TextPane from "./TextPane/TextPane";
import TitleDoc from "./TitleDoc/TitleDoc";
import FileInput from "./FileInput/FileInput";
import FileLinkList from "./FileLinkList/FileLinkList"
import FileNameList from "./FileNameList/FileNameList"
import HiddenInput from "./HiddenInput/HiddenInput";
import InputUser from "./InputUser/InputUser";
import DisplayUser from "./DisplayUser/DiasplayUser";


type Props = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
  typeDoc: DocType
  doc?: IDoc
  addDoc?: (row: IDoc) => void
  updDoc?: (row: IDoc) => void
}

type PropsRoles = {
  directings: [],
  id: string,
  title: string
}

type PropsUserList = {
  uid: string,
  email: string,
  photo: string,
  name: string
  roles: Array<PropsRoles>,
}

export default function EditForm({ setShowForm, doc, addDoc, updDoc, typeDoc }: Props) {
  const [disabled, setDisabled] = useState(false)
  const [errorMessage, setErrorResponse] = useState<IErrorMessage>();
  // список всех пользователей
  const [userList, setUserList] = useState(Array<PropsUserList>)
  const [fileList, setFileList] = useState<FileList[]>([])
  // список всех пользователей ознакомителей
  const [userListFamiliarizer, setUserListFamiliarizer] = useState(Array<string>)
  // список всех пользователей подписантов
  const [userListSubscribers, setUserListSubscribers] = useState(Array<string>)
  // список выбранных пользователей ознакомителей
  const [currentUserList, setCurrentUserList] = useState(Array<string>)
  // список выбранных пользователей подписантов
  const [currentUserListSubscribers, setCurrentUserListSubscribers] = useState(Array<string>)
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme
  

  useEffect(() => {
      fechDataUser()
      .then((res) => {
          setUserList(res)
          const tempListOfUser = [] as Array<string>
          const tempListOfUserSubscribers = [] as Array<string>
          res.map((value: PropsUserList) =>{ 
            // console.log(value)
            tempListOfUser.push(`${value.name} / ${value.roles[0]?.title}`);
            tempListOfUserSubscribers.push(`${value.name} / ${value.roles[0]?.title}`);
        })
          setUserListFamiliarizer(tempListOfUser)
          setUserListSubscribers(tempListOfUserSubscribers)

      })
      .catch((e) => {console.log(e.message)})
  }, [])

  return <form className={styles.root}
    onSubmit={event => _onSubmit(event, setDisabled, setShowForm, setErrorResponse, fileList, currentUserList, currentUserListSubscribers, userList, doc, addDoc, updDoc)}
  >
    <fieldset disabled={disabled} className="form-group">

      <small>{typeDoc.directing.title} / {typeDoc.task?.title}</small>


      <legend className="mt-3">{addDoc ? "Создание документа" : "Изменение документа"}</legend>

      {/* <SelectPane 
    directingId={doc?.directing.id.toString()}
    taskId={doc?.task.id.toString()}
    errorMessage={errorMessage} 
    mode={addDoc ? "create" : "update"} /> */}

      <TitleDoc errorMessage={errorMessage} title={doc?.title} />

      <FileLinkList docId={doc?.id} files={doc?.files} />

      <FileNameList fileList={fileList} setFileList={setFileList} errorMessage={errorMessage} />

      <FileInput errorMessage={errorMessage}
        setFileList={(file: FileList) => setFileList([...fileList, file])} />

      <TextPane description={doc?.description} />

      <HiddenInput typeDoc={typeDoc} />

      <div className={styles.formUser}>
        <DisplayUser currentUserList={currentUserList} setCurrentUserList={setCurrentUserList} userList={userListFamiliarizer} setUserList={setUserListFamiliarizer}/>
        <DisplayUser currentUserList={currentUserListSubscribers} setCurrentUserList={setCurrentUserListSubscribers} userList={userListSubscribers} setUserList={setUserListSubscribers}/>
      </div>

      <div className={styles.formUser}>
        <InputUser currentUserList={currentUserList} setCurrentUserList={setCurrentUserList} userList={userListFamiliarizer} setUserList={setUserListFamiliarizer}/>
        <InputUser currentUserList={currentUserListSubscribers} setCurrentUserList={setCurrentUserListSubscribers} userList={userListSubscribers} setUserList={setUserListSubscribers}/>
      </div>

      <>
        <input type="submit" className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`)} value="Записать" />

        <span className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`)} onClick={() => setShowForm(false)}>Отмена</span>
      </>

      <input type="hidden" name="author" defaultValue={session.getMe()?.uid} />
    </fieldset>
  </form>
}



function _onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorResponse: React.Dispatch<React.SetStateAction<IErrorMessage | undefined>>,
  fileList: FileList[],
  currentUserList: string[],
  currentUserListSubscribers: string[],
  userList: PropsUserList[],
  doc?: IDoc,
  addDoc?: (row: IDoc) => void,
  updDoc?: (row: IDoc) => void,
  
) {
  event.preventDefault();
  setDisabled(true);

  const fd = new FormData(event.currentTarget)

  fileList.map(f => fd.append('scans', f[0]))  
  // перебирает список всех юзеров и сравнивает со списком подписантов и отдает массив совпадений
  if (currentUserList.length !== 0) {
    // fd.append(`acceptor`, `${arryayUserFD(currentUserList, userList)}`)
    arryayUserFD(currentUserList, userList).map((e) => {
      // console.log(e.uid)
      fd.append(`acceptor[${e.uid}]`, '')
    })
  }
  // перебирает список всех юзеров и сравнивает со списком ознокомителей и отдает массив совпадений
  if (currentUserListSubscribers.length !== 0) {
    // fd.append(`recipient`, `${arryayUserFD(currentUserListSubscribers, userList)}`)
    arryayUserFD(currentUserListSubscribers, userList).map((e) => {
      // console.log(e.uid)
      fd.append(`recipient[${e.uid}]`, 'on')
    })
  }
  // fd.append(`recipient`, `${currentUserListSubscribers}`)

  // const test = fd.get('author') || ''
  // fd.append(`acceptor[${test}1]`, '')
  // fd.append(`acceptor[${test}2]`, '')
  // fd.append(`recipient[${test}]`, 'on')

  fetchWrapper(() => fetch(`${serviceHost('informator')}/api/informator/docflow/${doc?.id || ''}`, {
    method: addDoc ? 'POST' : 'PATCH',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.json()
        setShowForm(false)

        if (addDoc) {
          addDoc(res)
        }
        if (updDoc) {
          updDoc(res)
        }
        return;
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

const fechDataUser = async () => {
  const response = await fetch(`${serviceHost("informator")}/api/informator/user/all`, {
      headers: {
        'Authorization': `Bearer ${tokenManager.getAccess()}`
          }
        })
      if (!response.ok) {
          throw new Error(`Что то пошло не так ${response.status}`)
      } else {
          return await response.json()
      }
  }

function arryayUserFD(currentUserListSubscribers: string[], userList: PropsUserList[]) {
  const tempUserRecipient = [] as Array<PropsUserList>
  const listKeyAndValue = Object.entries(userList)
  listKeyAndValue.map((value) => {
    currentUserListSubscribers.map((valueuser) => {
      if (valueuser.includes(value[1].name) && valueuser.includes(value[1]?.roles[0]?.title))
      // console.log(userList[Number(value[0])])
      tempUserRecipient.push(userList[Number(value[0])])
    })
  })
  return tempUserRecipient
}