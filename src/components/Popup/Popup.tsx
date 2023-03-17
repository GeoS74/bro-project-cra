import styles from "./styles.module.css"
import classNames from "classnames";

type Props = {
  showPopup: boolean
  setShowPopup: React.Dispatch<React.SetStateAction<IPopup>>
  modePopup: string | undefined
}

export default function Popup({ showPopup, modePopup, setShowPopup }: Props) {
  if (!showPopup) {
    return <></>
  }

const mode = (modePopup !== 'success') ? 'alert-success' : 'alert-danger';
console.log(mode)

  return <div className={styles.root}>
    <div className={styles.layer} onClick={() => setShowPopup({ showPopup: false })}></div>

    <div className={classNames('alert', 'alert-dismissible', `alert-${modePopup}`)}
    // className={`alert alert-dismissible alert-success`}
    >
      <button type="button" className="btn-close"
        onClick={() => setShowPopup({ showPopup: false })}></button>
      <strong>Настройки успешно сохранены</strong>
    </div>
  </div>
}
