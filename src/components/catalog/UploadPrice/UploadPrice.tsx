import { useState } from "react";

import UploadPriceForm from "../UploadPriceForm/UploadPriceForm";
import styles from "./styles.module.css"

export default function UploadPrice() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [uploadState, setUploadState] = useState("new")

  return <div className={styles.root}>
    <h3>Загрузка прайса</h3>

    {error ? <span>{error}</span> : ""}

    {uploadState === "upload" ?
      <p>файл загружается ...</p> :

      uploadState === "end" ?
        <p>файл загружен.<span onClick={() => setUploadState("")}>Загрузить ещё?</span></p> :

        <UploadPriceForm setError={setError} setUploadState={setUploadState} />
    }
  </div>
}


// function TestForm(){
//   const [foo, setFoo] = useState("main")

//   return <form>
  //   <ul className="nav nav-tabs">
  //   <li className="nav-item">
  //     <span 
  //       onClick={()=>setFoo("main")}
  //       className={classNames("nav-link", foo==="main" ? "active":"")}>Home</span>
  //   </li>
  //   <li className="nav-item">
  //     <span 
  //     onClick={()=>setFoo("opt")}
  //     className={classNames("nav-link", foo==="opt" ? "active":"")}>Profile</span>
  //   </li>
  // </ul>
  
  // <div id="myTabContent" className="tab-content">
  // <div className={classNames("tab-pane fade", foo==="main" ? "active show":"")}>
  //     <input type="text" name="bar" />
  //   </div>
  //   <div className={classNames("tab-pane fade", foo==="opt" ? "active show":"")}>
  //   <input type="text" name="baz" />
  //   </div>
  // </div>
//   </form>
// }