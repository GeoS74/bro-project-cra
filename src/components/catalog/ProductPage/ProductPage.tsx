import { useLoaderData } from "react-router-dom"
import Image from "./Image/Image";
import Feature from "./Feature/Feature";
import classNames from "classnames";
import styles from "./styles.module.css"

export default function ProductPage() {
    const product = useLoaderData() as IProduct;

    return <div className={classNames(styles.root)}>
        <Image {...product} />
        <Feature {...product} />
    </div>
}