type Props = {
  cities: ICity[]
}

export default function CityList({cities}: Props) {
  return <div>
    {
      cities.length ? <select name="select" size={cities.length}>
      {_makeOptions(cities)}
    </select>
    : <></>
    }
  </div>
}

function _makeOptions(cities: ICity[]) {
  return cities.map((value, index) => {
    return <option key={index} value={value.fullname} >
      {value.fullname}
    </option>
  })
}