import serviceHost from "../../../libs/service.host"
import styles from "./styles.module.css"
import classNames from "classnames";

type Props = {
  image: string | undefined
  title: string
  message: string
  width: number
}

export default function Slider({ image, title, message, width }: Props) {
  return <div className={classNames(styles.root)} style={{ width: `${width}px` }}>
    <div className={styles.wrapper}>
      {/* <div>{title}</div> */}
      {image ? <img src={`${serviceHost('mnote')}/api/mnote/static/images/${image}`} /> : <></>}
      <div>{message}</div>
    </div>
  </div>
}