import Navigate from "../navigate/Navigate"
import styles from "./styles.module.css"
// import logo from "../navigate/image/logo.svg"
import Slider from "../Slider/Slider"
import SearchForm from "./SearchForm/SearchForm"
import Footer from "../Footer/Footer"

export default function Main() {
    return <>
        <Navigate />
        <div className={styles.root}>
            <h1>автозапчасти</h1>
            <hr />
            <SearchForm />
            <Slider />
            {/* <img src={logo} loading="lazy" />
            <h3>Поиск позиций</h3> */}
        </div>
        <Footer />
    </>
}