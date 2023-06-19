import { useLoaderData } from "react-router-dom"
import { ReactComponent as NotImage } from "./icons/tools.svg";
import classNames from "classnames";
import styles from "./styles.module.css"

export default function ProductPage() {
    const product = useLoaderData() as IProduct;
    console.log(product)
    return (
    <div className={classNames(styles.root)}>
        <div>
            <NotImage className={styles.svg}/>
            <p>Товар на фотосессии</p>
        </div>
        <div>
            <h2>{product.title}</h2>
            <p><span className="text-muted">Артикл:</span> {product.article}</p>
            <p><span className="text-muted">Производитель:</span> {product.manufacturer}</p>
            <p><span className="text-muted">Количество:</span> {+product.amount || "под заказ"}</p>
            <p><span className="text-muted">Цена за ед.:</span> {+product.price || <small>Уточняйте у менеджера</small>}</p>
                
            <p hidden={product.width === "0.00"}><span className="text-muted">Ширина:</span> {product.width}</p>
            <p hidden={product.height === "0.00"}><span className="text-muted">Высота:</span> {product.height}</p>
            <p hidden={product.length === "0.00"}><span className="text-muted">Длина:</span> {product.length}</p>
            <p hidden={product.weight === "0.00"}><span className="text-muted">Вес:</span> {product.weight}</p>

            {/* <p><span className="text-muted">{product.stock}</span></p> */}
        </div>
    </div>
)}