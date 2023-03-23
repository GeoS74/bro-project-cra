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
interface ISimpleListConf {
  brands: IListConf,
  providers: IListConf,
  roles: IListConf,
  directings: IListConf,
  tasks: IListConf,
  actions: IListConf
}

interface IListConf {
  serviceName: ServiceName
  title: string
  placeholderSearch: string
  placeholder: string
  api: string
}
