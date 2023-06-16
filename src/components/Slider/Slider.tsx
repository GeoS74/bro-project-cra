import { useState, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { ReactComponent as Left } from "./icons/arrow-left-circle-fill.svg";
import { ReactComponent as Right } from "./icons/arrow-right-circle-fill.svg";

import styles from "./styles.module.css"
// import classNames from "classnames";
import Slide from "./Slide/Slide"

export default function Slider() {
  const slides = useLoaderData() as ISlider[];
  if(!slides.length) {
    return <></>
  }

  const [active, setActive] = useState(0);

  const sliderWidth = document.body.clientWidth*0.6
  const countSlides = 3;
   
  return <div className={styles.root}>

    <div className={styles.header} style={{ width: `${sliderWidth}px` }}>

      <div><h4>специальное предложение</h4></div>
      <div>
      <Left className={styles.svg} 
        onClick={() => setActive(active === 0 ? slides.length - countSlides : active - 1)}
        />
      <Right className={styles.svg} 
        onClick={() => setActive(active === slides.length - countSlides ? 0 : active + 1)}
        />

      </div>
    </div>

    <div className={styles.pane} style={{ width: `${sliderWidth}px` }} >

      <div className={styles.slidesWrapper} style={{ left: `${active * -sliderWidth/countSlides}px` }}>
        {slides.map((e, i) => (
          <Slide
            key={i}
            image={e.files[0]?.fileName}
            title={e.title}
            message={e.message}
            width={sliderWidth/countSlides}
          />
        ))}
      </div>

    </div>

    {/* <div>
      <p onClick={() => setActive(active === 0 ? slides.length - countSlides : active - 1)}>back</p>
      <p onClick={() => setActive(active === slides.length - countSlides ? 0 : active + 1)}>forward</p>
    </div> */}
  </div>

}
