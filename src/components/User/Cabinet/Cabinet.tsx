import { useState, useRef, useEffect } from "react";
import styles from "./styles.module.css"
import classNames from "classnames"
import Photo from "../Photo/Photo"


type Props = {
  user: IUser
}

export default function Content({ user }: Props) {
  // видно кнопки или нет
  const [editMode, setEditMode] = useState(false)
  const [fornDataInfo, setFormDataInfo] = useState({position: ""})
  useEffect (() => {
    if (editMode === false) {
      console.log(1)
    }
    
  }, [editMode])
  // ищем div таблицы с информацией
  const divInformUser = useRef<HTMLDivElement>(null)
  
  return <div className={styles.root} >
    <h1>Личный кабинет</h1>
    <hr />
    <div className={styles.button}>
      <button onClick={() => {
        setEditMode(!editMode);
        // console.log(formInformUser.current?.children[2].innerHTML)
        }}>редактировать профиль</button>
    </div>
    <div className={classNames(styles.content, "mt-4")}>    
      <Photo user={user} editMode={editMode} fornDataInfo={fornDataInfo}/>
      <div className="accordion" id={styles.accordion}>

        <div className="accordion-item">
          <h2 className="accordion-header" onClick={(event) => collapser(event)}>
            <span className="accordion-button">
              пользователь
            </span>
          </h2>
          <div className="accordion-collapse">
            <div className="accordion-body" ref={divInformUser}>
              <p>email: {user.email}</p>
              <p>ранг: {user.rank}</p>
              <p className={classNames(editMode === false ? styles.disNon : styles.disBlok)}>должность: {user.position || "не указана"}</p>
              <label htmlFor="position" className={classNames(editMode === true ? styles.disNon : styles.disBlok)}>должность</label>
              <input type="text" className={classNames(editMode === true ? styles.disNon : styles.disBlok)} name="position"/>
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
              <p>1</p>
              <input type="text" />
              <p>2</p>
              <input type="text" />
              <p>3</p>
              <input type="text" />
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