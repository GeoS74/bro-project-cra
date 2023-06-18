import classNames from "classnames"
import styles from "./styles.module.css"

type Props = {
  countVisibleSlides: number
  countPaginations: number
  setActive: React.Dispatch<React.SetStateAction<number>>
  countSlides: number
}

export default function Pagination({
  countVisibleSlides,
  countPaginations,
  setActive,
  countSlides,
}: Props) {
  return <div className={classNames(styles.root)}>
    {new Array(countPaginations)
      .fill(null)
      .map((_, i) => <input key={i}
        className="form-check-input"
        type="radio"
        onClick={() => {
          const active = (i + 1) * countVisibleSlides > countSlides ?
            countSlides - countVisibleSlides :
            i * countVisibleSlides;
          setActive(active)
        }}
      />)}
  </div>
}