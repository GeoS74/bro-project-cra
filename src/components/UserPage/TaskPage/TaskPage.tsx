import React from "react";
import styles from "./styles.module.css"
import { Link } from "react-router-dom";

import { ReactComponent as Icon0 } from "../image/0.svg";
import { ReactComponent as Icon1 } from "../image/1.svg";
import { ReactComponent as Icon2 } from "../image/2.svg";
import { ReactComponent as Icon3 } from "../image/3.svg";
import { ReactComponent as Icon4 } from "../image/4.svg";
import { ReactComponent as Icon5 } from "../image/5.svg";

export default function TaskPage({value, index, ListTasks, Path}: {value: string, index: number, ListTasks: IDoc[], Path: string}) {
    const Icons = [{0: <Icon0 />}, {0: <Icon1 />}, {0: <Icon2 />}, {0: <Icon3 />}, {0: <Icon4 />}, {0: <Icon5 />}]    
    return (
    <Link to={Path} className={styles.root} state={{ListTasks, Path}}>
        <div>{value}</div>
        <div>{Icons[index][0]}</div>
        <div>{ListTasks.length}</div>        
    </Link>
)}