import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Header from "./Header/Header";
import Pane from "./Pane/Pane";
import styles from "./styles.module.css"

type Props = {
  width: number
}

const autoPlay = function(time) {
  let timerId: NodeJS.Timeout | undefined = undefined;

  return function(func: () => void) {
    if(timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => func(), time)
  }
}(3000);

export default function Slider({ width }: Props) {
  const slides = useLoaderData() as ISlider[];
  if (!slides.length) {
    return <></>
  }

  const [active, setActive] = useState(0);
  const countSlides = _getCountSlides(width);

  const prev = () => setActive(active === 0 ? slides.length - countSlides : active - 1);
  const next = () => setActive(active === slides.length - countSlides ? 0 : active + 1)

  autoPlay(next);

  return <div className={styles.root} >

    <div style={{ width: `${width}px` }}>
      <Header
        title="Специальное предложение"
        prev={prev}
        next={next}
        showButton={slides.length > countSlides}
      />

      <Pane
        slides={slides}
        active={active}
        width={width}
        countSlides={countSlides}
      />
    </div>
  </div>
}

function _getCountSlides(width: number) {
  return width / 250 > 5 ? 5 : Math.floor(width / 250)
}