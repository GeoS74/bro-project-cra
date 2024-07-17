import classNames from "classnames"
import styles from "./styles.module.css"

export default function Box() {
  return <div className={classNames(styles.root, "form-group col-sm-5")}>
    <label htmlFor="width" className="form-label mt-3">Габариты груза, м</label>

    <div>
      <input type="text" name="width" className="form-control mt-2" id="width" placeholder="Д" />
      <input type="text" name="height" className="form-control  mt-2" id="height" placeholder="Ш" />
      <input type="text" name="length" className="form-control  mt-2" id="length" placeholder="В" />
    </div>


  </div>
}