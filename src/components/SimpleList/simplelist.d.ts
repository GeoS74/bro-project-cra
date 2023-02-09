/*
* интерфейс объекта одно записи, возвращаемой бэкендом
* бэкенд списка возвращает массив таких объектов
*/
interface IRow {
  id: number
  title: string
}
/*
*интерфейс настроект компоненты  SimpleList
*/
interface IListConf {
  title: string
  placeholderSearch: string
  placeholder: string
  api: string
}
