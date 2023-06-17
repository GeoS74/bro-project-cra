import Slide from "../Slide/Slide"

import styles from "./styles.module.css"

type Props = {
  slides: ISlider[]
  active: number
  width: number
  countSlides: number
}

export default function Pane({slides, active, width, countSlides}: Props) {
  return <div className={styles.root} >

  <div className={styles.slidesWrapper} style={{ left: `${active * -width/countSlides}px` }}>
    {slides.map((e, i) => (
      <Slide
        key={i}
        image={e.files[0]?.fileName}
        message={e.message}
        width={width/countSlides}
      />
    ))}
  </div>

</div>
}