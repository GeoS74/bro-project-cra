import finder from "../../../../libs/deep.finder"
import session from "../../../../libs/token.manager"
import styles from "../../DocSelectType/styles.module.css"
import classNames from "classnames"
import CancelButton from "../../EditForm/CancelButton/CancelButton";

type Props = {
  directings: IDirecting[]
  setTypeDoc: React.Dispatch<React.SetStateAction<DocType | undefined>>
  typeDoc: DocType | undefined
}

export default function DocSelectDirectingForInvoice({ setTypeDoc, typeDoc, directings }: Props) {



  return <div className={classNames(styles.root, "mt-4")}>
    <legend>Создание счёта</legend>
    <p>Выберите направление</p>

    {!typeDoc?.directing ? <ul>
      {session.getMe()?.roles[0].directings.map(e => {

        // надо проверять на возможность создавать документы в рамках направления
        // иначе после выбора направления не будет отображён тип документа
        if (finder(e.tasks, 'Создать')) {
          return <li key={e.id}
            onClick={() => setTypeDoc({ directing: e })}
          >{e.title}</li>
        }
      })}
    </ul>
      : <></>}

    <CancelButton />
  </div>
}