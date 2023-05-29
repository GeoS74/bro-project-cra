import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import serviceHost from "../../libs/service.host"
import styles from "./styles.module.css"
import classNames from "classnames";

export default function Banner() {
  // const [about, setAbout] = useState(useLoaderData() as IAbout | undefined)
  const [active, setActive] = useState(0)

  // session.subscribe('about')

  const photo = ['ada536217d9765d010ecb3901.jpg', 'ada536217d9765d010ecb3900.jpg']

  return <div className={styles.root}>
    <div className={styles.slider}>
      {/* {photo.map((e, i) => {
        return <B image={e} key={i} active={active===i} />
      })} */}

<B image={photo[0]} active={active===0} />
<B image={photo[1]} active={active===1} />
<B image={photo[0]} active={active===2} />
<B image={photo[1]} active={active===3} />
    </div>

    <div>
    <p onClick={() => setActive(active === 0 ? photo.length-1 : active - 1)}>back</p>
    <p onClick={() => setActive(active === photo.length-1 ? 0 : active + 1)}>forward</p>
    </div>
  </div>

}

function B({ image, active }: { image: string, active: boolean }) {
  return <div className={classNames(styles.bar, active ? styles.foo : "")}
    >
      hello
    <img src={`${serviceHost('informator')}/api/informator/user/photo/${image}`} loading="lazy" />
  </div>
}

function foo(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  console.log(event.currentTarget.nextElementSibling)
  event.currentTarget?.classList.toggle(classNames(styles.bar))
}