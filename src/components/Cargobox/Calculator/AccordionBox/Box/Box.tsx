import OptionalHeader from "../OptionalHeader/OptionalHeader"
import classNames from "classnames"
import styles from "./styles.module.css"

type Props = {
  num: number
}

export default function Box({num}: Props) {
  return <div className={classNames(styles.root, "accordion-item")}>
    <h2 className="accordion-header" onClick={(event) => collapser(event)}>
      <span className={classNames("accordion-button", num>1 ? "collapsed" : "")}>
        Место {num}
      </span>
    </h2>

    <div className={classNames("accordion-collapse", num>1 ? "collapse" : "")}>
      <div className="accordion-body">
        
        {num > 1 ? <OptionalHeader /> : <></>}

        <div className={classNames(styles.box, "form-group col-sm-5")}>
          <label htmlFor="width" className="form-label mt-3">Габариты груза, м</label>
          <div>
            <input type="text" name="width" className="form-control mt-2" id="width" placeholder="Д" />
            <input type="text" name="height" className="form-control  mt-2" id="height" placeholder="Ш" />
            <input type="text" name="length" className="form-control  mt-2" id="length" placeholder="В" />
          </div>

          <label htmlFor="volume" className="form-label mt-3">Объём, м<sup>2</sup></label>
          <div>
            <input type="text" name="volume" className="form-control mt-2" id="volume" />
            <div></div><div></div>
          </div>

          <label htmlFor="weight" className="form-label mt-3">Вес, кг</label>
          <div>
            <input type="text" name="weight" className="form-control mt-2" id="weight" />
            <div></div><div></div>
          </div>

          <label htmlFor="amount" className="form-label mt-3">Кол-во таких мест</label>
          <div>
            <input type="text" name="amount" className="form-control mt-2" id="amount" defaultValue={1}/>
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