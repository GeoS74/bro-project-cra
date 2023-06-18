import styles from "./styles.module.css"

type Props = {
  countVisibleSlides: number
  countPaginations: number
  setActive: React.Dispatch<React.SetStateAction<number>>
  countSlides: number
  active: number
}

export default function Pagination({
  countVisibleSlides,
  countPaginations,
  setActive,
  active,
  countSlides,
}: Props) {
  return <div className={styles.root}>
    {new Array(countPaginations)
      .fill(null)
      .map((_, i) => {
        return <input key={i}
          className="form-check-input"
          type="radio"
          checked={active >= i * countVisibleSlides &&
            active < (i + 1) * countVisibleSlides ?
            true : false}

          onChange={() => {
            const active = (i + 1) * countVisibleSlides > countSlides ?
              countSlides - countVisibleSlides :
              i * countVisibleSlides;
            setActive(active)
          }}
        />
      })}
  </div>
}