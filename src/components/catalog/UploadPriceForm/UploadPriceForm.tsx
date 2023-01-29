import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import config from "../../../config";

export default function UploadPriceForm() {
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

      <form onSubmit={(event) => _onSubmit(event, setError, setUploadState)}>
    <select name="brandId">
      <option value="0">Выберите бренд</option>
      {_makeOptions(loaderData[0])}
    </select>

    <select name="providerId">
      <option value="0">Выберите поставщика</option>
      {_makeOptions(loaderData[1])}
    </select>
    <br/>
    <input type="file" name="file" />
    <br/>
    
    начальная строка: <input type="text" name="startRow" placeholder="цена" defaultValue="1"/><br/>
    читать до строки: <input type="text" name="endRow" placeholder="количество" /><br/>
    <hr/>

    <input type="text" name="code" placeholder="код" /><br/>
    <input type="text" name="article" placeholder="артикул" /><br/>
    <input type="text" name="title" placeholder="наименование" /><br/>
    <input type="text" name="price" placeholder="цена" /><br/>
    <input type="text" name="amount" placeholder="количество" /><br/>
    <hr/>
    <input type="text" name="manufacturer" placeholder="производитель" /><br/>
    <input type="text" name="weight" placeholder="вес, кг" /><br/>
    <input type="text" name="length" placeholder="длина, мм" /><br/>
    <input type="text" name="width" placeholder="ширина, мм" /><br/>
    <input type="text" name="height" placeholder="высота, мм" /><br/>
    <br/>

    <input type="submit" className="btn btn-outline-primary" value="Загрузить прайс" />
    </form>
    }
  </>
}

function _onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
  setUploadState: React.Dispatch<React.SetStateAction<string>>
){

  event.preventDefault()
  setUploadState("upload");

  fetch(`${config.catalog.back.host}:${config.catalog.back.port}/api/file/upload`, {
    method: 'POST',
    body: new FormData(event.target as HTMLFormElement)
  })
  .then(async response => {
    if(response.ok) {
      setError(undefined);
      const res = await response.json()
      console.log(res)
      setUploadState("end");
      return;
    }
    else if([400, 404].includes(response.status)){
      const res = await response.json()
      setError(res.error)
      return
    }
    throw new Error(`response status: ${response.status}`)
  })
  .catch(error => {
    setError("файл не загружен");
    console.log(error.message)
  })
}

function _makeOptions(brands: IRow[]) {
  return brands.map((value, index) => {
    return <option key={index} value={value.id} >
      {value.title}
    </option>
  })
}
