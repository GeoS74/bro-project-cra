type ServiceName = "bridge" | "mauth" | "informator"
type StyleTheme = "dark" | "light"
type PopupMode = "success" | "danger" | undefined

/*
* интерфейс объекта одно записи, возвращаемой бэкендом
* бэкенд списка возвращает массив таких объектов
*/
interface IRow {
  id: number
  title: string
}


interface ITheme {
    theme: StyleTheme;
    setTheme: Dispatch<SetStateAction<StyleTheme>>;
}

/*
* интерфейс объекта ответа, возвращаемого микросервисом "informator"
*/
interface IAbout {
  alias: string
  mdInfo: string
}

/*
* интерфейс объекта, возвращаемого бэкендом при успешной авторизации
*/
interface IAuthResponse {
  access: string
  refresh: string
}
/*
* интерфейс объекта ошибки формы авторизации/регистрации
*/
interface IErrorAuthMessage {
  message: string
  field: string
}
/*
* тип, устанавливающий возможные значения режима формы авторизации/регистрации
*/
type formMode = "signin" | "signup" | "forgot"
/*
* тип, устанавливающий возможные значения режима информационного сообщения (подтверждение email, сброс пароля)
*/
type infoCardMode = "confirm" | "recovery"

/*
* интерфейс объекта ответа, возвращаемого микросервисом "bridge"
*/
interface ISearchResult {
  limit: number
  offset: number
  positions: IProduct[]
}

/*
* интерфейс объекта продукта, возвращаемого микросервисом "bridge"
*/
interface IProduct {
  id:number
  createdAt: string
  brandId: number
  brantTitle: string
  providerId: number
  providerTitle: string
  code: string
  article: string
  title: string
  price: number
  amount: number
  manufacturer: string
  weight: number
  width: number
  height: number
  length: number
  manufacturer: string
  // storage: unknown
}

interface IDoc {
  id: string
  title: string
  description: string
  directing: IRow
  task: IRow
  author: IRow
  files: IDocFile[]
}

interface IDocFile {
  originalName: string
  fileName: string
}

interface IErrorDocMessage {
  message: string
  field: string
}

interface IRole extends IRow {
  directings: IDirecting[]
}

interface IDirecting extends IRow {
  tasks: ITask[]
}

interface ITask extends IRow {
  actions: IRow[]
}


/*
*интерфейс настроек компоненты  SimpleList
*/
// type SL = "brands" | "providers" | "roles" | "directings" | "tasks" | "actions"
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

interface IUser {
  email: string
  rank: string
  roles: IRole[]
  name?: string
  photo?: string
  status?: string
}