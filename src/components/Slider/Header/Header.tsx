import { ReactComponent as Left } from "./icons/arrow-left-circle-fill.svg";
import { ReactComponent as Right } from "./icons/arrow-right-circle-fill.svg";

import styles from "./styles.module.css"

type Props = {
  title: string
  width: number
  active: number
  setActive: React.Dispatch<React.SetStateAction<number>>
  countSlides: number
  countVisibleSlides: number
}

export default function Header({ title, width, active, setActive, countSlides, countVisibleSlides }: Props) {
  return <div className={styles.root} style={{ width: `${width}px` }}>

    <div>
      <h4>{title}</h4>
    </div>

    <div>
      {countSlides > countVisibleSlides ?
          <>
            <Left className={styles.svg}
              onClick={() => setActive(active === 0 ? countSlides - countVisibleSlides : active - 1)}
            />
            <Right className={styles.svg}
              onClick={() => setActive(active === countSlides - countVisibleSlides ? 0 : active + 1)}
            />
          </>
          : <></>
      }

    </div>
  </div>
}