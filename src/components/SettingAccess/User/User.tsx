import styles from "../styles.module.css"
import classNames from "classnames"
import Access from "../Access/Access"



export default function User({nameUser, accessUser}: {nameUser: string, accessUser: Array<object>}) {
    return (
    <div className="accordion" id={styles.accordion}>
        <div className="accordion-item">
                <h2 className="accordion-header" onClick={(event) => collapser(event)}>
                <span className="accordion-button collapsed">
                    {nameUser}
                </span>
                </h2>
            <div className="accordion-collapse collapse">
                <div className="accordion-body">
                    {accessUser.map((key, index) => {
                        return(
                            <Access key={index} accessTable={key} nameUser={nameUser}/>
                        )
                    })}               
                </div>
            </div>
        </div>
    </div>
    
)}

function collapser(event: React.MouseEvent<HTMLHeadingElement, MouseEvent>) {
    event.currentTarget.firstElementChild?.classList.toggle("collapsed")
    event.currentTarget.nextElementSibling?.classList.toggle("collapse")
  }