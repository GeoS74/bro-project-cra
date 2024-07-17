import { useSelector } from "react-redux";
import Box from "./Box/Box"
import classNames from "classnames"
import styles from "./styles.module.css"
import { useState } from "react"

export default function AccordionBox() {
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme
  const [amountPlaces, setAmountPlaces] = useState(1)

  return <>
    <button type="button"  
        onClick={() => setAmountPlaces(amountPlaces+1)}
        className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'} mt-4 mb-4`)} >+ Добавить место</button>

    <div className={classNames(styles.root, "accordion")}>
      {
        new Array(amountPlaces).fill(null).map((_, i) => <Box num={i+1} key={i} />)
      }
    </div>
  </>
}

 