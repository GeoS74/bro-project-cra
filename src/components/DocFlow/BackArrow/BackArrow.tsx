import styles from "./styles.module.css"
import {ReactComponent as IconBackArrow} from "./backArrow.svg"
import { Link } from "react-router-dom"

export default function BackArrow() {
    return (
        <Link to={"/docflow"}>
            <IconBackArrow  height="30px" width="30px" className={styles.root}/>
        </Link>
        
)}