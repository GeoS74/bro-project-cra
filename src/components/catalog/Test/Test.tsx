import { useState } from "react"

export default function Test() {
  return <>
    <h3>test page</h3>
    <List data={['apple', 'banana', 'orange']} />
  </>
}

function List({ data }: { data: string[] }) {
  const [arr, setArr] = useState(data)
  
  return <>
    <ul>
      {makeRows(arr)}
    </ul>
    <Button hook={(newData) => setArr([...arr, ...newData])}/>
  </>
}

function Button({hook}: {hook: React.Dispatch<string[]>}){
  return <button onClick={()=> hook(['coca-cola', 'fanta', 'sprite'])}>load</button>
}

function makeRows(rows: string[]) {
  return rows.map((v, i) => <Li key={i} val={v} />)
}

function OptionalButton({name}: {name: string}){
  return <span>{name}</span>
}

function Li({val}: {val: string}){
  const [showOpt, setState] = useState(false)
  return <li 
    style={{padding: "10px"}} 
    onMouseEnter={() => setState(true)} 
    onMouseLeave={() => setState(false)}>
      {showOpt ? <>
      {val} <OptionalButton name="Редактировать" /> /
       <OptionalButton name="Удалить" />
        </> : val }
    </li>
}

