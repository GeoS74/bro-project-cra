import { useSelector } from "react-redux";
import Box from "./Box/Box"
import classNames from "classnames"
import styles from "./styles.module.css"
import { useState } from "react"

export default function AccordionBox() {
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme
  const [boxes, setBoxes] = useState([<Box num={1} key={0} />]);

  return <>
    <button type="button"  
        onClick={() => setBoxes([...boxes, <Box num={boxes.length+1} key={boxes.length} />])}
        className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'} mt-4 mb-4`)} 
    >+ Добавить место</button>

    <div className={classNames(styles.root, "accordion")}>
      {[...boxes]}
    </div>
  </>
}

 