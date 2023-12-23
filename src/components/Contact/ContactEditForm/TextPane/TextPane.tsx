import classNames from "classnames"
import styles from "./styles.module.css"

type Props = {
  val?: string
}

export default function TextPane({ val }: Props) {
  return <div className={classNames("form-group mb-4", styles.root)}>
    <label htmlFor="descTextarea" className="form-label mt-4">Примечание</label>
    <textarea className="form-control" id="descTextarea" name="info" defaultValue={val}></textarea>
  </div>
}
