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
    <Button hook={setArr}/>
  </>
}

function makeRows(rows: string[]) {
  return rows.map(v => {
    return <li>{v}</li>
  })
}

function Button({hook}: {hook: React.Dispatch<React.SetStateAction<string[]>>}){
  return <button onClick={()=> hook(['coca-cola', 'fanta', 'sprite'])}>load</button>
}
