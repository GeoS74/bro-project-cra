import { useState } from "react"
import serviceHost from "../../../../libs/service.host"
import CityList from "./CityList"

type Props = {
  fieldName: string
}

export default function City({fieldName}: Props) {
  const [cities, setCities] = useState<ICity[]>([]);
  const [activeCity, setACtiveCity] = useState<ICity>();
  const [inputValue, setInputValue] = useState('');

  console.log('render')

  return <div className="form-group col-sm-5">
    <label htmlFor={fieldName} className="form-label mt-4">Откуда</label>
    <input type="text" 
      className="form-control" 
      id={fieldName} 
      placeholder="выберите город"
      value={activeCity?.fullname || inputValue}
      onInput={(event) => _searchCity(event, setCities, setACtiveCity, setInputValue)}
       
    />

    <CityList cities={cities} setACtiveCity={setACtiveCity} setCities={setCities} />

    <input type="text" 
      name={fieldName} 
      defaultValue={activeCity?.code}
    />
  </div>
}

function _searchCity(
  event: React.FormEvent<HTMLInputElement>,
  setCities: React.Dispatch<React.SetStateAction<ICity[]>>,
  setACtiveCity: React.Dispatch<React.SetStateAction<ICity | undefined>>,
  setInputValue: React.Dispatch<React.SetStateAction<string>>
) {
  setACtiveCity(undefined);
  setInputValue(event.currentTarget.value);

  fetch(`${serviceHost("cargobox")}/api/cargobox/kladr/search/city/?city=${event.currentTarget.value}`)
    .then(async response => {
      if (response.ok) {
        const res = await response.json()
        // console.log(res)
        setCities(res);
        return;
      }
      setCities([]);
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


 