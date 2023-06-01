import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import serviceHost from "../../libs/service.host"
import styles from "./styles.module.css"
import classNames from "classnames";
import Slide from "./Slide/Slide"

export default function Banner() {
  // const [about, setAbout] = useState(useLoaderData() as IAbout | undefined)
  const [active, setActive] = useState(0)

  // session.subscribe('about')

  const photo = [
    'efa8da88aadfdebc83d1b9801.png',
    'efa8da88aadfdebc83d1b9802.jpg',
    'efa8da88aadfdebc83d1b9800.jpg',
  ]
  const prev = active - 1 < 0 ? photo.length - 1 : active - 1;
  const next = active + 1 > photo.length - 1 ? 0 : active + 1;

  return <div className={styles.root}>
    <div className={styles.slider}>

      <div className={styles.slidesWrapper} style={{ left: `${active * -180}px` }}>
        {photo.map((e, i) => <Slide image={e} key={i} />)}
      </div>

      {/* <B image={photo[0]} active={active===0} />
<B image={photo[1]} active={active===1} />
<B image={photo[0]} active={active===2} />
<B image={photo[1]} active={active===3} /> */}
    </div>

    <div>
      <p onClick={() => setActive(active === 0 ? photo.length - 1 : active - 1)}>back</p>
      <p onClick={() => setActive(active === photo.length - 1 ? 0 : active + 1)}>forward</p>
    </div>
  </div>

}

type Props = {
  image: string,
}

function B({ image }: Props) {
  return <div className={classNames(styles.slide)}>
    <div>{image}</div>
    <img src={`${serviceHost('informator')}/api/informator/user/photo/${image}`} />
  </div>
}

function foo(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  console.log(event.currentTarget.nextElementSibling)
  event.currentTarget?.classList.toggle(classNames(styles.bar))
}