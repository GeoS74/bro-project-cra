import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import styles from "./styles.module.css"
import TaskPage from "../TaskPage/TaskPage";
import session from "../../../libs/token.manager"



export default function TasksPage() {
    const [docs, setDocs] = useState(useLoaderData() as IDoc[])
    const [showForm, setShowForm] = useState(false);
    const bar = session?._me?.email
    const meTasks = docs.filter(user => user?.author.email === bar)
    const notMeTasks = docs.filter(user => user?.author.email !== bar)
    return (
        <div className={styles.root}>
          {showForm ?
          <div>akfhafhkaejfk</div> :
          <div className={styles.tasks}>            
              <div className={styles.task}>
                  <TaskPage value={"Мои поручения"} index={0} ListTasks={meTasks} Path={"/userPage/listMeTasks"} setShowForm={setShowForm}/>
                  <TaskPage value={"Поручения мне"} index={1} ListTasks={notMeTasks} Path={"/userPage/listOtherTasks"} setShowForm={setShowForm}/>
                  <TaskPage value={"Создать документ"} index={1} ListTasks={notMeTasks} Path={"/userPage/listOtherTasks"} setShowForm={setShowForm}/>
              </div>
          </div> 
          }      
                      
        </div>    
    )
}