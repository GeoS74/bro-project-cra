import classNames from "classnames"
import styles from "./styles.module.css"

export default function Doc({title}: IDoc) {
    return <div className={classNames(styles.root, "mt-2")}>
        <h5>{title}</h5>
    </div>
}