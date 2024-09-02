import OptionalHeader from "../OptionalHeader/OptionalHeader"
import classNames from "classnames"
import styles from "./styles.module.css"

type Props = {
  num: number
  delBox: () => void
  isFirst: boolean
}

export default function Box({ num, delBox, isFirst }: Props) {

  return <div className={classNames(styles.root, "accordion-item")}>
    <h2 className="accordion-header" onClick={(event) => collapser(event)}>
      <span className={classNames("accordion-button", num > 1 ? "collapsed" : "")}>
        Место {num}
      </span>
    </h2>

    <div className={classNames("accordion-collapse", num > 1 ? "collapse" : "")}>
      <div className="accordion-body">

        {!isFirst ? <OptionalHeader delBox={() => delBox()} /> : <></>}

        <div className={classNames(styles.box, "form-group col-sm-5")}>
          <label htmlFor={`width${num}`} className="form-label mt-3">Габариты груза, м</label>
          <div>
            <input type="text" name="width" className="form-control mt-2" id={`width${num}`} placeholder="Д" />
            <input type="text" name="height" className="form-control  mt-2" id={`height${num}`} placeholder="Ш" />
            <input type="text" name="length" className="form-control  mt-2" id={`length${num}`} placeholder="В" />
          </div>

          <label htmlFor={`volume${num}`} className="form-label mt-3">Объём, м<sup>2</sup></label>
          <div>
            <input type="text" name="volume" className="form-control mt-2" id={`volume${num}`} />
            <div></div><div></div>
          </div>

          <label htmlFor={`weight${num}`} className="form-label mt-3">Вес, кг</label>
          <div>
            <input type="text" name="weight" className="form-control mt-2" id={`weight${num}`} />
            <div></div><div></div>
          </div>

          <label htmlFor={`amount${num}`} className="form-label mt-3">Кол-во таких мест</label>
          <div>
            <input type="text" name="amount" className="form-control mt-2" id={`amount${num}`} defaultValue={1} />
            <div></div><div></div>
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