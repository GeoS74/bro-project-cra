import { useState } from "react";
import styles from "./styles.module.css"
import { Link } from "react-router-dom";
import classNames from "classnames";

import finder from "../../../libs/deep.finder"
import session from "../../../libs/token.manager"
import { ReactComponent as Icon0 } from "../image/0.svg";
import { ReactComponent as Icon1 } from "../image/1.svg";

export default function TaskPage({setShowForm, value, index, ListTasks, Path}: {setShowForm: React.Dispatch<React.SetStateAction<boolean>>, value: string, index: number, ListTasks: IDoc[], Path: string}) {
    const Icons = [{0: <Icon0 />}, {0: <Icon1 />}]
   
    session.subscribe('task');
    if (value === "Мои поручения" || value === "Поручения мне")  {
        return (
            <Link to={Path} className={styles.root} state={{ListTasks, Path}}>
                <div>{value}</div>
                <div>{Icons[index][0]}</div>
                <div>{ListTasks.length}</div>        
            </Link>
        )
    }
    return (
        <button className={styles.root} onClick={() => setShowForm(true)}>
            <div className={styles.createElement}>{value}</div>
        </button>
    )}