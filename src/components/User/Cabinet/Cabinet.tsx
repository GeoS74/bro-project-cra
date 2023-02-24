import { useState } from "react";
import styles from "./styles.module.css"
import classNames from "classnames"
import Photo from "../Photo/Photo"


type Props = {
  user: IUser
}

export default function Content({ user }: Props) {
  const [editMode, setEditMode] = useState(false)
  
  return <div className={styles.root} >
    <h1>Личный кабинет</h1>
    <hr />
    <div className={styles.button}>
      <button onClick={() => {
        setEditMode(!editMode)
        console.log(editMode)
        }}>редактировать профиль</button>
    </div>
    <div className={classNames(styles.content, "mt-4")}>    
      <Photo user={user} editMode={editMode}/>
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
              <p>должность: {user.position || "не указана"}</p>
              <input type="text" value={"xsasca"}/>
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