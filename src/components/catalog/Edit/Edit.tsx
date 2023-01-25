import {
  Link,
  useLoaderData,
} from "react-router-dom";
import EditForm from "../EditForm/EditForm"

export default function Edit({type}: {[index: string]: string}) {
  const rows = useLoaderData();
  console.log(rows)
  const {title, name, placeholder} = _makeData(type)
  return <>
    <h1>{title}</h1>
    <EditForm name={name} placeholder={placeholder}/>
    {_makeRows(rows)}
  </>
}

function _makeRows(rows: unknown){
  let result = ""
  if(Array.isArray(rows)){
    for(const row of rows){
      result += row
    }
  }
  return <div>{result}</div>
}

function _makeData(type: string){
  switch(type){
    case "brands": return {
      title: "Редактирование брендов",
      name: "title",
      placeholder: "Бренд",
    }
    case "providers": return {
      title: "Редактирование поставщиков",
      name: "title",
      placeholder: "Поставщик",
    }
    default: return {
      title: "Редактирование списка",
      name: "title",
      placeholder: "Название",
    }
  }
}