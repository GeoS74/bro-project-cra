import { useLoaderData } from "react-router-dom"
import Image from "./Image/Image";
import Feature from "./Feature/Feature";
import SearchForm from "../../Main/SearchForm/SearchForm";
import classNames from "classnames";
import styles from "./styles.module.css"
import Head from "../../Head/Head";

export default function ProductPage() {
    const product = useLoaderData() as IProduct;

    return <>
    <Head 
        title={`${product.title} купить в SIGNAL, низкая цена`}
        description={`${product.title} купить в магазине автомобильных запчастей и запасных частей к спецтехнике SIGNAL, низкая цена`}
    />
    <SearchForm />

    <div className={classNames(styles.root)}>
        <Image {...product} />
        <Feature {...product} />
    </div>
    </>
}