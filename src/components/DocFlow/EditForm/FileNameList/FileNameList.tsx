// import styles from "./styles.module.css"

type Props = {
  fileList: FileList[]
}

export default function FileInput({ fileList }: Props) {
  return <div className="mt-4">
    {fileList.length ? <><legend>Файлы:</legend><hr></hr></> : <></>}

    <ul>
    {fileList.map((f, i) => {
      return <li key={i}>
        {f.item(0)?.name}
      </li>
    })}
    </ul>
  </div>
}
