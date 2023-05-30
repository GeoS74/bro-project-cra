import serviceHost from "../../../libs/service.host"
import styles from "./styles.module.css"
import classNames from "classnames";

type Props = {
  image: string
}

export default function Slider({ image }: Props) {
  return <div className={classNames(styles.root)}>
      <div>{image}</div>
    <img src={`${serviceHost('informator')}/api/informator/user/photo/${image}`}  />
  </div>
}