import { useReducer, useState } from "react"

export default function Test() {
  return <>
    <h3>test page</h3>
    <List data={['apple', 'banana', 'orange']} />
  </>
}

const reducer = (current: string[], arr: string[]) => {
  return current.concat(arr)
}

function List({ data }: { data: string[] }) {
  const [arr, setArr] = useReducer(reducer, data)
  
  return <>
    <ul>
      {makeRows(arr)}
    </ul>
    <Button hook={setArr}/>
  </>
}

function makeRows(rows: string[]) {
  return rows.map((v, i) => {
    return <li key={i}>{v}</li>
  })
}

function Button({hook}: {hook: React.Dispatch<string[]>}){
  return <button onClick={()=> hook(['coca-cola', 'fanta', 'sprite'])}>load</button>
}
