type Props = {
  cities: ICity[]
  setCities: React.Dispatch<React.SetStateAction<ICity[]>>
  setACtiveCity: React.Dispatch<React.SetStateAction<ICity | undefined>>
}

export default function CityList({ cities, setCities, setACtiveCity }: Props) {
  return cities.length ? <ul>{_makeLi(cities, setCities, setACtiveCity)}</ul> : <></>
}

function _makeLi(
  cities: ICity[],
  setCities: React.Dispatch<React.SetStateAction<ICity[]>>,
  setACtiveCity: React.Dispatch<React.SetStateAction<ICity | undefined>>
) {
  return cities.map((city, index) => {
    return <li 
    key={index} 
    onClickCapture={() => {
      setACtiveCity(city)
      setCities([])
       
    }}
    >
      {city.fullname}
    </li>
  })
}
