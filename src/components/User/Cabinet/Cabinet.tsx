import styles from "./styles.module.css"

type Props = {
  user: IUser
}

export default function Content({ user }: Props) {
  return <div className={styles.root}>
    <h1>Личный кабинет</h1>
    <p>email: {user.email}</p>




    <div className="accordion" id="accordion">

      <div className="accordion-item">
        <h2 className="accordion-header" onClick={(event) => collapser(event)}>
          <span className="accordion-button">
            Accordion Item #1
          </span>
        </h2>
        <div className="accordion-collapse">
          <div className="accordion-body">
            hello world
            <span className="foo">aasdasdsad</span>
          </div>
        </div>
      </div>


      <div className="accordion-item">
        <h2 className="accordion-header" onClick={(event) => collapser(event)}>
          <span className="accordion-button collapsed">
            Accordion Item #2
          </span>
        </h2>
        <div className="accordion-collapse collapse">
          <div className="accordion-body">
            lorem ipsum
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