import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import UploadPriceForm from "../UploadPriceForm/UploadPriceForm";
import styles from "./styles.module.css"

export default function UploadPrice() {
  /*
  * первый элемент массива исходных данных - бренды
  * второй - поставщики
  */
  const loaderData = useLoaderData() as IRow[][];

  const [error, setError] = useState<string | undefined>(undefined);
  const [uploadState, setUploadState] = useState("new")

  return <div className={styles.root}>
    <h3>Загрузка прайса</h3>

    {/* {error ? <span>{error}</span> : ""}

    {uploadState === "upload" ?
      <p>файл загружается ...</p> :

      uploadState === "end" ?
        <p>файл загружен.<span onClick={() => setUploadState("")}>Загрузить ещё?</span></p> :

        <UploadPriceForm loaderData={loaderData} setError={setError} setUploadState={setUploadState} />
    } */}







    <ul className="nav nav-tabs" role="tablist">
      <li className="nav-item" role="presentation">
        <span className="nav-link" data-bs-toggle="tab" aria-selected="true" role="tab">Home</span>
      </li>
      <li className="nav-item" role="presentation">
        <span className="nav-link active" data-bs-toggle="tab" aria-selected="false" role="tab">Profile</span>
      </li>
    </ul>
    
    <div id="myTabContent" className="tab-content">
      <div className="tab-pane fade" id="home" role="tabpanel">
        <p>first</p>
      </div>
      <div className="tab-pane fade active show" id="profile" role="tabpanel">
        <p>second</p>
      </div>
    </div>





  </div>
}
