import { useState } from "react"
import serviceHost from "../../../../libs/service.host"
import CityList from "./CityList"

type Props = {
  fieldName: string
}

export default function City({fieldName}: Props) {
  const [cities, setCity] = useState<ICity[]>([]);
  console.log(cities)
  return <>
    <div className="form-group col-sm-5">
      <label htmlFor={fieldName} className="form-label mt-4">Откуда</label>
      <input type="text" 
        className="form-control" 
        id={fieldName} 
        placeholder="выберите город"
        onInput={(event) => _searchCity(event, setCity)}
      />

      <CityList cities={cities} />

      {/* <input type="text" 
        name={fieldName} 
        defaultValue={cities[0]?.fullname}
      /> */}
    </div>
  </>
}

function _searchCity(
  event: React.FormEvent<HTMLInputElement>,
  setCity: React.Dispatch<React.SetStateAction<ICity[]>>
) {
  // console.log(event.currentTarget.value)
  // setCity([event.currentTarget.value])

  fetch(`${serviceHost("cargobox")}/api/cargobox/kladr/search/city/?city=${event.currentTarget.value}`)
    .then(async response => {
      if (response.ok) {
        const res = await response.json()
        // console.log(res)
        setCity(res);
        return;
      }
      setCity([]);
      // else if ([400, 404].includes(response.status)) {
      //   return;
      // }
      // throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
}


// function _getErrorResponse(error: string): IErrorMessage {
//   switch (error) {
//     case "invalid title":
//       return { field: "title", message: "Введите название документа" }
//     case "invalid directing id":
//       return { field: "directSelect", message: "Не выбрано направление" }
//     case "invalid task id":
//       return { field: "taskSelect", message: "Не выбран тип документа" }
//     case "bad mime type":
//       return { field: "fileUpload", message: "Не поддерживаемый тип файлов" }
//     default: return { field: "", message: "" }
//   }
// }


 