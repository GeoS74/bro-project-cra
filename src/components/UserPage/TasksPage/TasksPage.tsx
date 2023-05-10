import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import styles from "./styles.module.css"
import TaskPage from "../TaskPage/TaskPage";
import session from "../../../libs/token.manager"
import finder from "../../../libs/deep.finder"
import CreateTask from "../CreateTask/CreateTask";



export default function TasksPage() {
    const [docs, setDocs] = useState(useLoaderData() as IDoc[])
    const [showForm, setShowForm] = useState(false);
    const bar = session?._me?.email
    const meTasks = docs.filter(user => user?.author.email === bar)
    const notMeTasks = docs.filter(user => user?.author.email !== bar)
    return (
        <div className={styles.root}>
          {showForm ?
          <CreateTask /> :
          <div className={styles.tasks}>            
              <div className={styles.task}>
                  <TaskPage value={"Мои поручения"} index={0} ListTasks={meTasks} Path={"/userPage/listMeTasks"}/>
                  <TaskPage value={"Поручения мне"} index={1} ListTasks={notMeTasks} Path={"/userPage/listOtherTasks"}/>
                  {finder(session.getMe()?.roles, 'Создать') ?
                    <TaskPage value={"Создать документ"} index={1} ListTasks={notMeTasks} Path={"/userPage/createTasks"}/>
                    : <></>
        }
              </div>
          </div> 
          }      
                      
        </div>    
    )
}