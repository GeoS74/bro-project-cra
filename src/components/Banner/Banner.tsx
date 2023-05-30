import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import serviceHost from "../../libs/service.host"
import styles from "./styles.module.css"
import classNames from "classnames";

export default function Banner() {
  // const [about, setAbout] = useState(useLoaderData() as IAbout | undefined)
  const [active, setActive] = useState(0)

  // session.subscribe('about')

  const photo = [
    '2ef4417463d41785932017001.jpg', 
    'ada536217d9765d010ecb3900.jpg', 
    '2ef4417463d41785932017000.jpg',
  ]
  const prev = active - 1 < 0 ? photo.length-1 : active - 1;
  const next = active + 1 > photo.length-1 ? 0 : active + 1;

  return <div className={styles.root}>
    <div className={styles.slider}>
    
    <div className={styles.sl} style={{left: `${active*-180}px`}}>
    {photo.map((e, i) => {
        return <B image={e} key={i} curr={active===i} prev={prev===i} next={next===i}/>
      })}
    </div>

{/* <B image={photo[0]} active={active===0} />
<B image={photo[1]} active={active===1} />
<B image={photo[0]} active={active===2} />
<B image={photo[1]} active={active===3} /> */}
    </div>

    <div>
    <p onClick={() => setActive(active === 0 ? photo.length-1 : active - 1)}>back</p>
    <p onClick={() => setActive(active === photo.length-1 ? 0 : active + 1)}>forward</p>
    </div>
  </div>

}

type Props = {
  image: string, 
  curr: boolean,
  prev: boolean,
  next: boolean,
}

function B({ image, curr, prev, next }: Props) {
  return <div className={classNames(styles.slide, curr ? styles.target : "")}
    >
      <div>{image}</div>
    <img src={`${serviceHost('informator')}/api/informator/user/photo/${image}`}  />
  </div>
}

function foo(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  console.log(event.currentTarget.nextElementSibling)
  event.currentTarget?.classList.toggle(classNames(styles.bar))
}