import { useState } from "react";
import styles from "./styles.module.css"
import classNames from "classnames"
import Photo from "../Photo/Photo"
import serviceHost from "../../../libs/service.host"
import tokenManager from "../../../classes/TokenManager"


type Props = {
  user: IUser,
}

type EditMode = {  
  editMode: boolean,
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
  formInput: string,
}

export default function Content({ user }: Props) {
  // имя кнопки и замена тегов <p> на <input>
  const [editMode, setEditMode] = useState(true)
  // значение тега input
  const [formInput, setFormInput] = useState("")
  
  return <div className={styles.root} >
    <h1>Личный кабинет</h1>
    <hr />
    <div className={classNames(styles.content, "mt-4")}>
      <div>
        <div className={styles.formAndButton}>
          <Photo user={user} />
          <button  
          onClick={() => submitinformUser({editMode, setEditMode, formInput})}>
            {editMode === true ? "Редактировать профиль" : "Отправить"}
          </button>
        </div>        
      </div>      
      <div className="accordion" id={styles.accordion}>

        <div className="accordion-item">
          <h2 className="accordion-header" onClick={(event) => collapser(event)}>
            <span className="accordion-button">
              пользователь
            </span>
          </h2>
          <div className="accordion-collapse">
            <div className="accordion-body">
              <p>email: {user.email}</p>
              <p>ранг: {user.rank}</p>
              <p className={classNames(editMode === false ? styles.disNon : styles.disBlok)}>должность: {userInfo({formInput, user})}</p>
              <label htmlFor="position" className={classNames(editMode === true ? styles.disNon : styles.disBlok)}>должность</label>
              <input type="text" className={classNames(editMode === true ? styles.disNon : styles.disBlok)}  
                    name="position"
                    onChange={(event) => setFormInput(event.target.value)}/>
            </div>
          </div>
        </div>


        <div className="accordion-item">
          <h2 className="accordion-header" onClick={(event) => collapser(event)}>
            <span className="accordion-button collapsed">
              доп. информация
            </span>
          </h2>
          <div className="accordion-collapse collapse">
            <div className="accordion-body">
              <p className={classNames(editMode === false ? styles.disNon : styles.disBlok)}>Хобби</p>
              <label htmlFor="position" className={classNames(editMode === true ? styles.disNon : styles.disBlok)}>Хобби</label>
              <input type="text" className={classNames(editMode === true ? styles.disNon : styles.disBlok)} name="position"/>
              <p className={classNames(editMode === false ? styles.disNon : styles.disBlok)}>Пол</p>
              <label htmlFor="position" className={classNames(editMode === true ? styles.disNon : styles.disBlok)}>Пол</label>
              <input type="text" className={classNames(editMode === true ? styles.disNon : styles.disBlok)} name="position"/>
              <p className={classNames(editMode === false ? styles.disNon : styles.disBlok)}>Питомец</p>
              <label htmlFor="position" className={classNames(editMode === true ? styles.disNon : styles.disBlok)}>Питомец</label>
              <input type="text" className={classNames(editMode === true ? styles.disNon : styles.disBlok)} name="position"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}

function collapser(event: React.MouseEvent<HTMLHeadingElement, MouseEvent>) {
  event.currentTarget.firstElementChild?.classList.toggle("collapsed")
  event.currentTarget.nextElementSibling?.classList.toggle("collapse")
}

function submitinformUser({editMode, setEditMode,  formInput}: EditMode) {
  setEditMode(!editMode)  
  const fd = new FormData
  fd.append("position", formInput)
  setEditMode(!editMode)
  fetch(`${serviceHost("informator")}/api/informator/user`, {
    method: 'PATCH',
    headers: {
        'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
        })   
}
// меняет значение поля <p>. значение из поля <input>
function userInfo({formInput, user}: {formInput: string, user: IUser} ) {
  if (formInput !== "") {
    return formInput
  } else {
    if (user.position !== null) {
      return user.position
    } else return "не указана"
  }
}