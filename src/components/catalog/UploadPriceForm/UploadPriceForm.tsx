import { useState } from "react";
import config from "../../../config";

type Props = {
  /*
  * первый элемент массива исходных данных loaderData - бренды
  * второй - поставщики
  */
  loaderData: IRow[][],
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
  setUploadState: React.Dispatch<React.SetStateAction<string>>,
}

export default function UploadPriceForm({ loaderData, setError, setUploadState }: Props) {
  return <form onSubmit={(event) => _onSubmit(event, setError, setUploadState)}>
    <div className="form-group row col-sm-5">
      <select name="brandId" className="form-select m-1">
        <option value="0">Выберите бренд</option>
        {_makeOptions(loaderData[0])}
      </select>

      <select name="providerId" className="form-select m-1">
        <option value="0">Выберите поставщика</option>
        {_makeOptions(loaderData[1])}
      </select>

      <input type="file" name="file" className="form-control m-1" />
    </div>

    <div className="form-group row col-sm-3">
      начальная строка: <input type="text" name="startRow" placeholder="цена" defaultValue="1" />
      конечная строка: <input type="text" name="endRow" placeholder="количество" />
      <hr />
    </div>

    <MainFields />
    <hr />
    <OptionalFields />
    <hr />

    <input type="submit" className="btn btn-outline-primary" value="Загрузить прайс" />
  </form>
}

function _onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
  setUploadState: React.Dispatch<React.SetStateAction<string>>
) {

  event.preventDefault()
  setUploadState("upload");

  fetch(`${config.catalog.back.host}${config.catalog.back.port ? ':':''}${config.catalog.back.port}/api/bridge/file/upload`, {
    method: 'POST',
    body: new FormData(event.target as HTMLFormElement)
  })
    .then(async response => {
      if (response.ok) {
        setError(undefined);
        const res = await response.json()
        console.log(res)
        setUploadState("end");
        return;
      }
      else if ([400, 404].includes(response.status)) {
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

function MainFields() {
  const [visible, setVisible] = useState(false)

  return <div className="form-group row col-sm-3">
    <label className="form-label mt-4" onClick={()=>setVisible(!visible)}>Основные данные</label>
    {visible ?
      <>
        <input type="text" name="code" placeholder="код позиции" />
        <input type="text" name="article" placeholder="артикул" />
        <input type="text" name="title" placeholder="наименование" />
        <input type="text" name="price" placeholder="цена" />
        <input type="text" name="amount" placeholder="количество" />
        <input type="text" name="profit" placeholder="наценка" />
      </> : <></>
    }
  </div>
}

function OptionalFields() {
  const [visible, setVisible] = useState(false)

  return <div className="form-group row col-sm-3">
    <label className="form-label mt-4" onClick={()=>setVisible(!visible)}>Дополнительные данные</label>
    {visible ?
      <>
        <input type="text" name="manufacturer" placeholder="производитель" />
      <input type="text" name="weight" placeholder="вес, кг" />
      <input type="text" name="length" placeholder="длина, мм" />
      <input type="text" name="width" placeholder="ширина, мм" />
      <input type="text" name="height" placeholder="высота, мм" />
      </> : <></>
    }
  </div>
}