import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Header from "./Header/Header";

import styles from "./styles.module.css"
import Slide from "./Slide/Slide"

type Props = {
  width: number
}

export default function Slider({width}: Props) {
  const slides = useLoaderData() as ISlider[];
  if(!slides.length) {
    return <></>
  }

  const [active, setActive] = useState(0);
  const countSlides = _getCountSlides(width);
  console.log(countSlides)
  return <div className={styles.root}>

    <Header 
      title="Специальное предложение"
      width={width}
      active={active}
      setActive={setActive}
      countSlides={slides.length}
      countVisibleSlides={countSlides}
    />

    <div className={styles.pane} style={{ width: `${width}px` }} >

      <div className={styles.slidesWrapper} style={{ left: `${active * -width/countSlides}px` }}>
        {slides.map((e, i) => (
          <Slide
            key={i}
            image={e.files[0]?.fileName}
            title={e.title}
            message={e.message}
            width={width/countSlides}
          />
        ))}
      </div>

    </div>
  </div>
}

function _getCountSlides(width: number) {
  return width/250 > 5 ? 5 : Math.floor(width/250)
}