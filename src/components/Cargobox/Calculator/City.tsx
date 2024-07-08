import { useState } from "react"
import tokenManager from "../../../libs/token.manager"
import serviceHost from "../../../libs/service.host"
import fetchWrapper from "../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../middleware/response.validator"

export default function City() {
  const [city, setCity] = useState<string[]>([])
  return <>
    <div className="form-group col-sm-5">
      <label htmlFor="arrival" className="form-label mt-4">Откуда</label>
      <input type="text" 
        name="arrival" 
        className="form-control" 
        id="arrival" 
        placeholder="выберите город"
        onInput={(event) => _searchCity(event, setCity)}
      />
    </div>
  </>
}

function _searchCity(
  event: React.FormEvent<HTMLInputElement>,
  setCity: React.Dispatch<React.SetStateAction<string[]>>
) {
  console.log(event.currentTarget.value)
}

// function _makeOptions(brands: ISimpleRow[]) {
//   return brands.map((value, index) => {
//     return <option key={index} value={value.id} >
//       {value.title}
//     </option>
//   })
// }