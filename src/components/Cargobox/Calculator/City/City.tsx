import { useEffect, useState } from "react"
import serviceHost from "../../../../libs/service.host"
import CityList from "./CityList"
import classNames from "classnames"
import styles from "./styles.module.css"
import { ErrorMessage } from "../../../DocFlow/EditForm/ErrorMessage/ErrorMessage"

type Props = {
  fieldName: string
  labelValue: string
  setError: React.Dispatch<React.SetStateAction<IErrorMessage | undefined>>
  errorMessage: IErrorMessage | undefined
}

/*
логика работы компоненты:
при вводе символов с клавиатуры, компонента обращается к бэку для получения списка городов
если список получен и он не пустой, то под полем input отображается список подсказок.
При потере фокуса поля input или при клике по элементу списка подсказок - список скрывается,
поле получает правильное название населенного пункта, а в скрытое поле записывается код города.

Для сокрытия списка используется событие onBlur на поле ввода, это событие обнуляет список городов,
что в свою очередь скрывает список подсказок. При клике по элементу выпадающего списка, происходит тоже самое. 
Проблема здесь в том, что событие click возникает только когда клавиша мыши отпускается, а событие blur срабатывает
сразу после нажатия кнопки мыши и потере фокуса на поле ввода.

mousedown -> blur -> mouseup -> click

Поэтому, тут надо каким-то образом обрабатывать событие click на элементе списка ДО наступления blur события,
иначе click не будет вызван, т.к. blur обнулит список городов. 

Вариант 1: использовать setTimeout внутри blur события (см. строку 79).
Плюсы: компонента потребует только 2 useState. 
Минусы: задержка должна быть примерно 250 мс, эту задержку видно глазом. 
Более того, пользователь может зажать клавишу мыши и не отпускать её какое-то время. 
В этом случае blur также сработает раньше. 

Вариант 2: отслеживать клики по компоненте
Плюсы: нет зависимости от setTimeout-a 
Минусы: требуется дополнительный useState (setMouseDown), обработчик события onMouseDown и useEffect

В этой реализации добавляется useState (setMouseDown), который по факту работает как флаг для отслеживания
клика внутри компоненты. Т.к. событие mousedown наступает раньше blur, то это позволяет отловить клик по компоненте. 
При срабатывании onMouseDown стейт mouseDown меняется на true, а следующий за этим вызов onBlur
реагирует в зависимости от состояния mouseDown. Если true - то клик был по компоненте и делать ничего не надо,
если false - то клик был вне компоненты (иначе бы сработало событие mousedown) и в этом случае надо скрыть
список подсказок. Хук useEffect вызывается после рендера компоненты и устанавливает стейт mouseDown в
исходное состояние. 
*/

export default function City({fieldName, labelValue, setError, errorMessage}: Props) {
  const [cities, setCities] = useState<ICity[]>([]);
  const [activeCity, setACtiveCity] = useState<ICity>();
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => setMouseDown(false))

  return <div 
    className={classNames("form-group col-sm-5", styles.root)}
    onMouseDown={() => setMouseDown(true)}
  >

    <label htmlFor={fieldName} className="form-label mt-4">{labelValue}</label>
    <input type="text" 
      className="form-control" 
      id={fieldName} 
      placeholder="выберите город"
      autoComplete="off"
      value={activeCity?.fullname || ''}

      // срабатывает если фокус на input-е и город ещё не выбран
      onFocus={(event) => {
        if(!activeCity?.code) {
          _searchCity(event, setCities, setACtiveCity, setError)
        }
      }}

      onInput={(event) => _searchCity(event, setCities, setACtiveCity, setError)}

      onBlur={() => {
        if(mouseDown) return;

        if(cities.length) {
          setCities([])
          // setTimeout(() => setCities([]), 250)
        }
      }} 
    />
    {errorMessage?.field === fieldName ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}

    <CityList 
      cities={cities} 
      setACtiveCity={setACtiveCity} 
      setCities={setCities} 
    />

    <input type="hidden" 
      name={fieldName} 
      defaultValue={activeCity?.code || ''}
    />
  </div>
}

function _searchCity(
  event: React.FormEvent<HTMLInputElement>,
  setCities: React.Dispatch<React.SetStateAction<ICity[]>>,
  setACtiveCity: React.Dispatch<React.SetStateAction<ICity | undefined>>,
  setError: React.Dispatch<React.SetStateAction<IErrorMessage | undefined>>
) {

  // сброс сообщения об ошибке
  setError(undefined);

  // сбрасывает активного города
  setACtiveCity({
    fullname: event.currentTarget.value,
    code: ''
  });

  if(!event.currentTarget.value) {
    return;
  }

  fetch(`${serviceHost("cargobox")}/api/cargobox/kladr/search/city/?city=${event.currentTarget.value}`)
    .then(async response => {
      if (response.ok) {
        const res = await response.json()
        setCities(res);
        return;
      } 
      else if ([400, 404].includes(response.status)) {
        setCities([]);
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => {
      console.log(error.message);
      setCities([]);
    })
}
 