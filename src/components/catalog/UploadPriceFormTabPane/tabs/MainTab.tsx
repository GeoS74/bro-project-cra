import { useLoaderData } from "react-router-dom";

export const MainTab = () => {
  /*
  * первый элемент массива исходных данных - бренды
  * второй - поставщики
  */
  const loaderData = useLoaderData() as ISimpleRow[][];

  return <>
    <div className="form-group col-sm-5">
      <label htmlFor="brandSelect" className="form-label mt-4">Бренды</label>

      <select name="brandId" className="form-select" id="brandSelect">
        <option value="0">Выберите бренд</option>
        {_makeOptions(loaderData[0])}
      </select>
    </div>

    <div className="form-group col-sm-5">
      <label htmlFor="providerSelect" className="form-label mt-4">Поставщики</label>

      <select name="providerId" className="form-select" id="providerSelect">
        <option value="0">Выберите Поставщика</option>
        {_makeOptions(loaderData[1])}
      </select>
    </div>

    <div className="form-group col-sm-4">
      <label htmlFor="formFile" className="form-label mt-4">Прайс в формате Excel (.xls, .xlsx)</label>
      <input className="form-control" name="file" type="file" id="formFile" />
    </div>
  </>
}

function _makeOptions(brands: ISimpleRow[]) {
  return brands.map((value, index) => {
    return <option key={index} value={value.id} >
      {value.title}
    </option>
  })
}