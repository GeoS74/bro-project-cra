import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles.module.css";
import {setNewAddDoc} from '../../../store/slice/docListSlise'


import session from "../../../libs/token.manager";
import finder from "../../../libs/deep.finder";
import DocRow from "../DocRow/DocRow";
import SearchForm from "../SearchForm/SearchForm";
import NextSearch from "../NextSearch/NextSearch";
import TaskPage from "../TaskPage/TaskPage";
import ButtonCreateTask from "../ButtonCreateTask/ButtonCreateTask";


const docsLimit = 25;

export default function DocList() {
  session.subscribe('task');
  const [docs, setDocs] = useState(useLoaderData() as IDoc[])
  const dispatch = useDispatch();
  docs.map((value) => dispatch(setNewAddDoc(value)))
  const state = (useSelector(state => state) as {docList: Array<IDoc>})
  console.log(state.docList)

  const [showNextButton, setShowNextButton] = useState(true)
  const meTasks = docs.filter(user => user?.author.email === session.getMe()?.email)
  const notMeTasks = docs.filter(user => user?.author.email !== session.getMe()?.email)


  return <div className={styles.root} >
    <h3>Мои документы</h3>

    <SearchForm setDocs={setDocs} limit={docsLimit} setShowNextButton={setShowNextButton} />

    <div className={styles.tasks}>            
        <div className={styles.task}>
            <TaskPage value={"Мои поручения"} index={0} ListTasks={meTasks} Path={"/docflow/listMeTasks"}/>
            <TaskPage value={"Поручения мне"} index={1} ListTasks={notMeTasks} Path={"/docflow/listOtherTasks"}/>
            {finder(session.getMe()?.roles, 'Создать') ?
                <ButtonCreateTask />
                : <></>
                }
        </div>
    </div>
    
    {/* {showForm ?
      <DocSelectType setShowForm={setShowForm} addDoc={(newDoc: IDoc) => setDocs([newDoc, ...docs])} />
      :  */}
      <>

        {/* {finder(session.getMe()?.roles, 'Создать') ?
        <button type="button"
                className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'} mt-4`)}
                onClick={() => setShowForm(true)}
              >Создать документ</button>
          : <></>
        } */}

        {docs?.map(doc => <DocRow key={doc.id} {...doc} />)}

        {docs.length > 0 ? <NextSearch
          setDocs={(newDocs: IDoc[]) => setDocs([...docs, ...newDocs])}
          lastId={docs[docs.length - 1]?.id}
          limit={docsLimit}
          showNextButton={showNextButton}
          setShowNextButton={setShowNextButton}
        />
          : <></>}

      </>
      {/* } */}
  </div>
}



