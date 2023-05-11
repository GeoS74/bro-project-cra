import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import styles from "./styles.module.css"
import TaskPage from "../TaskPage/TaskPage";
import session from "../../../libs/token.manager"
import finder from "../../../libs/deep.finder"



export default function TasksPage() {
    session.subscribe('userPageTask');
    const [docs] = useState(useLoaderData() as IDoc[])
    const meTasks = docs.filter(user => user?.author.email === session.getMe()?.email)
    const notMeTasks = docs.filter(user => user?.author.email !== session.getMe()?.email)
    return (
        <div className={styles.root}>
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
                      
        </div>    
    )
}