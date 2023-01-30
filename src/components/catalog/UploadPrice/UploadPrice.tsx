import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import UploadPriceForm from "../UploadPriceForm/UploadPriceForm";

export default function UploadPrice() {
  /*
  * первый элемент массива исходных данных - бренды
  * второй - поставщики
  */
  const loaderData = useLoaderData() as IRow[][];

  const [error, setError] = useState<string | undefined>(undefined);
  const [uploadState, setUploadState] = useState("new")

  return <>
    <h1>Загрузка прайса</h1>

    {error ? <span>{error}</span> : ""}

    {uploadState === "upload" ?
      <p>файл загружается ...</p> :

      uploadState === "end" ?
        <p>файл загружен.<span onClick={() => setUploadState("")}>Загрузить ещё?</span></p> :

        <UploadPriceForm loaderData={loaderData} setError={setError} setUploadState={setUploadState} />
    }
  </>
}
