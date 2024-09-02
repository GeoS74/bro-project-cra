import { useSelector } from "react-redux";
import Box from "./Box/Box"
import classNames from "classnames"
import styles from "./styles.module.css"
import { useState } from "react"

// для создания грузовых мест используется стейт в компоненте `AccordionBox`
// идея в том, чтобы в стейте boxes сохранять массив объектов с единственным свойством `num`
// и отрисовывать компоненты `Box` на основе этого стейта. 
// При добавлении нового грузового места берётся последний элемент массива и добаляется новый со своством `num + 1`
// При удалении грузового места происходит фильтрация массива `boxes`
// Если попытаться прокинуть пропсами `boxes` и `setBoxes` в компонент `Box`, то удаление грузового места отработает не правильно
// это происходит из-за того, что каждый компонент `Box` сохранит свою копию массива `boxes` из родительского стейта. 
// Другими словами, если создаётся 3-е грузовое место, то уже созданное 2-е будет знать только о себе и предыдущем месте, 
// и ничего о 3-ем, т.к. в его пропсе будет только 2 элемента в массиве.

export default function AccordionBox() {
  const theme = (useSelector((state) => state) as { theme: { theme: string } }).theme.theme

  const [boxes, setBoxes] = useState([{ num: 1 }]);

  return <>
    <button type="button"
      onClick={() => setBoxes([...boxes, { num: boxes[boxes.length - 1].num + 1 }])}
      className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'} mt-4 mb-4`)}
    >+ Добавить место</button>

    <div className={classNames(styles.root, "accordion")}>
      {boxes.map((e, i) => <Box
        isFirst={i === 0}
        num={e.num}
        key={e.num}
        delBox={() => setBoxes(boxes.filter(b => b.num != e.num))}
      />)}
    </div>
  </>
}

