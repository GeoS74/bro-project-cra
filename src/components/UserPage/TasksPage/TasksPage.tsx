import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import styles from "./styles.module.css"
import TaskPage from "../TaskPage/TaskPage";
import session from "../../../libs/token.manager"



export default function TasksPage() {
  return <></>
//     const [docs, setDocs] = useState(useLoaderData() as IDoc[])    
//     const bar = session?._me?.email
//     const meTasks = docs.filter(user => user?.author === bar)
//     const notMeTasks = docs.filter(user => user?.author !== bar)
//     return (
//         <div className={styles.root}>           
//             <div className={styles.tasks}>            
//                 <div className={styles.task}>
//                     <TaskPage value={"Мои поручения"} index={0} ListTasks={meTasks} Path={"/userPage/listMeTasks"}/>
//                     <TaskPage value={"Поручения мне"} index={1} ListTasks={notMeTasks} Path={"/userPage/listOtherTasks"}/>
//                 </div>
//             </div>           
//         </div>    
// )
}