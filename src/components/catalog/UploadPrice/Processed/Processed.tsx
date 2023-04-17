import { time } from 'console';
import { useEffect, useState } from 'react';

export default function Processed(): JSX.Element {
    const [count, setCount] = useState("1");
    const [text, setText] = useState("Файл загружается.")
    
    useEffect(() => {
            if (count === "1") {
                    setTimeout(() => {
                        setCount("2")
                        setText("Файл загружается..")
                    }, 1000)
            } else if (count === "2") {
                setTimeout(() => {
                    setCount("3")
                    setText("Файл загружается...")
                }, 1000)
            } else if (count === "3") {
                setTimeout(() => {
                    setCount("1")
                    setText("Файл загружается.")
                }, 1000)
            }
    
    }, [count])
    
    
   return <p>{text}</p>
      
}